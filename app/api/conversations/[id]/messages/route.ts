import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// POST - Save message to conversation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify conversation belongs to user
    const { data: conversation, error: checkError } = await supabase
      .from('conversations')
      .select('user_id')
      .eq('id', id)
      .single();

    if (checkError || !conversation || conversation.user_id !== user.id) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Check daily message limit (50 messages per day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // First get user's conversation IDs
    const { data: userConvs } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', user.id);

    const conversationIds = userConvs?.map(c => c.id) || [];

    const { data: todayMessages, error: countError } = await supabase
      .from('messages')
      .select('id', { count: 'exact' })
      .eq('role', 'user')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())
      .in('conversation_id', conversationIds);

    if (countError) {
      console.error('Count error:', countError);
    }

    const messageCount = todayMessages?.length || 0;
    const DAILY_LIMIT = 30; // Re-enabled: Protect against API cost spikes

    if (messageCount >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: 'Daily message limit reached', limit: DAILY_LIMIT },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { role, content, articleSuggestion } = body;

    if (!role || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: message, error: insertError } = await supabase
      .from('messages')
      .insert({
        conversation_id: id,
        role,
        content,
        article_suggestion: articleSuggestion || null
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert message error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
