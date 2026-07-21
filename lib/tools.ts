// lib/tools.ts
// Tool definitions for Calmify's agentic capabilities

/**
 * Tool interface for function calling
 */
export interface Tool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

/**
 * Tool call interface
 */
export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

/**
 * Tool result interface
 */
export interface ToolResult {
  tool_call_id: string;
  result: any;
}

/**
 * Available tools for Calmify's agentic system
 */
export const CALMIFY_TOOLS: Tool[] = [
  {
    name: 'suggest_article',
    description: 'Suggest a relevant article to the user based on their current mental state, topic, or needs. Use this when the user might benefit from reading related content.',
    parameters: {
      type: 'object',
      properties: {
        articleSlug: {
          type: 'string',
          description: 'The slug/identifier of the article to suggest',
          enum: [
            'burnout-recovery-builders-guide',
            'overcoming-imposter-syndrome',
            'shipping-anxiety-why-we-fear-done',
            'context-switching-is-killing-creativity',
            'sunday-scaries-for-developers',
            'lost-your-spark-its-not-discipline-its-rest'
          ]
        },
        reason: {
          type: 'string',
          description: 'Explanation of why this article is relevant to the user right now (1-2 sentences)'
        }
      },
      required: ['articleSlug', 'reason']
    }
  },
  {
    name: 'detect_crisis_level',
    description: 'Assess whether the user is in crisis and determine the severity level. Use this when the user expresses difficult emotions, hopelessness, or mentions self-harm.',
    parameters: {
      type: 'object',
      properties: {
        severity: {
          type: 'string',
          enum: ['none', 'mild', 'moderate', 'severe'],
          description: 'Crisis severity level'
        },
        risk_type: {
          type: 'string',
          enum: ['self_harm', 'overwhelmed', 'emotional_distress', 'none'],
          description: 'Type of crisis risk detected'
        },
        requires_immediate_resources: {
          type: 'boolean',
          description: 'Whether crisis resources should be provided immediately'
        },
        assessment: {
          type: 'string',
          description: 'Brief explanation of the crisis assessment (1-2 sentences)'
        }
      },
      required: ['severity', 'assessment']
    }
  },
  {
    name: 'infer_mood',
    description: 'Infer the user\'s current mood from their message. Use this to understand the user\'s emotional state and provide appropriate responses.',
    parameters: {
      type: 'object',
      properties: {
        mood: {
          type: 'string',
          enum: ['great', 'good', 'okay', 'anxious', 'low'],
          description: 'The inferred mood state'
        },
        confidence: {
          type: 'number',
          description: 'Confidence level from 0 to 1',
          minimum: 0,
          maximum: 1
        },
        indicators: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific words or phrases that indicate this mood'
        },
        suggested_response_approach: {
          type: 'string',
          description: 'Brief note on how to respond given this mood'
        }
      },
      required: ['mood', 'confidence', 'indicators']
    }
  }
];

/**
 * Tool execution handlers
 */
export const toolHandlers: Record<string, (args: any) => Promise<any>> = {
  /**
   * Suggest article handler
   * Validates article slug and returns suggestion data
   */
  suggest_article: async (args) => {
    const { articleSlug, reason } = args;

    console.log('📖 suggest_article called with:', { articleSlug, reason });

    // Validate article exists
    const validSlugs = CALMIFY_TOOLS[0].parameters.properties.articleSlug.enum;
    if (!validSlugs.includes(articleSlug)) {
      console.error('❌ Invalid article slug:', articleSlug);
      throw new Error(`Invalid article slug: ${articleSlug}`);
    }

    // Import articles dynamically
    const { getArticleBySlug } = await import('./articles');
    const article = getArticleBySlug(articleSlug);

    if (!article) {
      console.error('❌ Article not found:', articleSlug);
      throw new Error(`Article not found: ${articleSlug}`);
    }

    console.log('✅ Article found:', article.title);

    return {
      success: true,
      article: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        readTime: article.readTime
      },
      reason
    };
  },

  /**
   * Crisis detection handler
   * Returns crisis assessment with appropriate resources
   */
  detect_crisis_level: async (args) => {
    const { severity, risk_type, requires_immediate_resources, assessment } = args;

    const resources = {
      india: {
        name: 'iCall',
        phone: '9152987821',
        description: '24/7 psychological support service in India'
      },
      global: {
        name: 'International Association for Suicide Prevention',
        url: 'https://www.iasp.info/resources/Crisis_Centres/',
        description: 'Global crisis center directory'
      }
    };

    return {
      success: true,
      severity,
      risk_type: risk_type || 'none',
      requires_immediate_resources: requires_immediate_resources || false,
      assessment,
      resources: requires_immediate_resources ? resources : null,
      recommended_response: getRecommendedResponse(severity, risk_type)
    };
  },

  /**
   * Mood inference handler
   * Returns inferred mood with metadata
   */
  infer_mood: async (args) => {
    const { mood, confidence, indicators, suggested_response_approach } = args;

    console.log('😊 infer_mood called with:', { mood, confidence, indicators, suggested_response_approach });

    const result = {
      success: true,
      mood,
      confidence,
      indicators,
      suggested_response_approach,
      timestamp: new Date().toISOString()
    };

    console.log('✅ Mood inference result:', result);

    return result;
  }
};

/**
 * Get recommended response based on crisis level
 */
function getRecommendedResponse(severity: string, riskType?: string): string {
  if (severity === 'severe' || riskType === 'self_harm') {
    return 'immediate_crisis_response';
  }
  if (severity === 'moderate') {
    return 'supportive_with_resources';
  }
  if (severity === 'mild') {
    return 'empathetic_listening';
  }
  return 'standard_response';
}

/**
 * Execute a tool call
 */
export async function executeToolCall(toolCall: ToolCall): Promise<ToolResult> {
  const { id, name, arguments: args } = toolCall;

  if (!toolHandlers[name]) {
    throw new Error(`Unknown tool: ${name}`);
  }

  try {
    const result = await toolHandlers[name](args);
    return {
      tool_call_id: id,
      result
    };
  } catch (error) {
    return {
      tool_call_id: id,
      result: {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    };
  }
}

/**
 * Format tool calls for Mistral API
 */
export function formatToolsForMistral(): any[] {
  return CALMIFY_TOOLS.map(tool => ({
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters
    }
  }));
}
