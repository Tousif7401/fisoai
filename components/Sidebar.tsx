"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { createPortal } from 'react-dom';
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  History,
  User
} from 'lucide-react';

// Utility function for className merging
function cn(...classes: (string | undefined | null | false | number)[]) {
  return classes.filter(Boolean).join(" ");
}

// Tooltip Components
const TooltipProvider = TooltipPrimitive.TooltipProvider;
const Tooltip = TooltipPrimitive.Tooltip;
const TooltipTrigger = TooltipPrimitive.TooltipTrigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.TooltipContent>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.TooltipContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white shadow-md backdrop-blur-xl",
      className
    )}
    style={{
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.TooltipContent.displayName;

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('new-chat');
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent, text: string, forceShow = false) => {
    // Only show tooltip if collapsed OR if forceShow is true (for collapse button)
    if (isCollapsed || forceShow) {
      setTooltip({
        text,
        x: e.clientX + 15,
        y: e.clientY + 15,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setShowTooltip(false);
  };

  const menuItems: MenuItem[] = [
    { icon: Plus, label: 'New chat', onClick: () => console.log('New chat') },
    { icon: BookOpen, label: 'Articles' },
    { icon: History, label: 'History' },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.label === 'New chat') {
      setActiveItem('new-chat');
    } else if (item.label === 'Articles') {
      setActiveItem('articles');
    } else if (item.label === 'History') {
      setActiveItem('history');
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-screen overflow-hidden relative glassmorphism-sidebar font-['Almarai']"
      style={{
        backdropFilter: 'blur(15px) saturate(179%)',
        WebkitBackdropFilter: 'blur(15px) saturate(179%)',
        backgroundColor: 'rgba(17, 25, 40, 0.27)',
        borderRadius: '0 12px 12px 0',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <TooltipProvider>
      {/* Header - Logo */}
      <div className="p-3 border-b border-white/10 relative z-10">
        <div className={cn(
          "flex items-center gap-3 py-2 transition-all duration-300",
          isCollapsed ? "px-1 justify-center" : "px-2 justify-between"
        )}>
          {/* Logo + Text - Shows expand icon on hover when collapsed */}
          <div
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => {
              setIsLogoHovered(false);
              handleMouseLeave();
            }}
            onMouseMove={(e) => handleMouseMove(e, 'Expand')}
            onClick={onToggle}
            className={cn(
              "relative cursor-pointer rounded-lg transition-colors",
              isCollapsed && "hover:bg-white/10"
            )}
          >
                <div className="flex items-center">
                  {/* Logo */}
                  <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {/* Calmify Logo - hidden when hovering and collapsed */}
                    {(!isLogoHovered || !isCollapsed) && (
                      <img
                        src="/logo.svg"
                        alt="Calmify Logo"
                        className="w-14 h-14 brightness-0 invert"
                      />
                    )}
                    {/* Expand icon - shows on hover when collapsed */}
                    {mounted && isLogoHovered && isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <PanelLeftOpen className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Logo Text - Always with logo when expanded */}
                  {!isCollapsed && (
                    <p className="text-lg text-white drop-shadow-md -ml-2">
                      Calmify AI
                    </p>
                  )}
                </div>
              </div>

          {/* Collapse Button - Only visible when expanded */}
          {!isCollapsed && (
            <motion.button
              initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.8 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              onMouseMove={(e) => handleMouseMove(e, 'Collapse', true)}
              onMouseLeave={handleMouseLeave}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PanelLeftClose className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
        {/* Menu Items */}
        <div className="p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label.toLowerCase();
              const isSpecial = item.label === 'New chat';

              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  onMouseMove={(e) => handleMouseMove(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${
                    isActive && !isSpecial
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white border border-transparent'
                  } ${isSpecial ? 'bg-white/10 hover:bg-white/20 border border-white/20' : ''}`}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 text-left font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && !isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-2 py-0.5 text-xs font-medium rounded-full"
                      style={{ backgroundColor: item.badgeColor, color: 'white' }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
        </div>
      </div>

      {/* Footer - User Profile */}
      <div className="p-2 border-t border-white/10">
          <motion.div
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer group"
            onClick={() => console.log('Profile clicked')}
            onMouseMove={(e) => handleMouseMove(e, 'Profile')}
            onMouseLeave={handleMouseLeave}
          >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20">
                  <span className="text-white font-semibold text-sm">M</span>
                </div>

                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm font-medium text-white truncate">MohammedTousif</p>
                      <p className="text-xs text-gray-400">Free plan</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
      </div>

      {/* Floating Tooltip */}
      {mounted && tooltip && showTooltip && createPortal(
        <div
          className="fixed pointer-events-none z-[100] px-3 py-1.5 text-sm text-white rounded-md border border-white/10 backdrop-blur-xl font-['Almarai']"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {tooltip.text}
        </div>,
        document.body
      )}
      </TooltipProvider>
    </motion.aside>
  );
}

export default Sidebar;
