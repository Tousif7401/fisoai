"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  MessageSquare,
  History,
  User,
  LogOut,
  HelpCircle,
  Settings,
  Camera,
  UserX
} from 'lucide-react';
import { AvatarPicker, avatarList } from '@/components/ui/avatar-picker';
import { HelpModal } from '@/components/HelpModal';
import ConversationList from '@/components/ConversationList';
import { signOut, getProfile } from '@/lib/supabase/auth';
import { createBrowserClient } from '@supabase/ssr';

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
  currentConversationId?: string | null;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle, currentConversationId }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileName, setProfileName] = useState('Mohammed Tousif');
  const [profileEmail, setProfileEmail] = useState('mohammed@example.com');
  const [profilePhoto, setProfilePhoto] = useState('M');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savedAvatarSvg, setSavedAvatarSvg] = useState<React.ReactNode>(null);
  const [currentSelectedAvatar, setCurrentSelectedAvatar] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setProfileName(profile.full_name || 'User');
        setProfileEmail(profile.email || '');
        if (profile.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
        // Load selected avatar from avatar_id
        if (profile.avatar_id) {
          const avatar = avatarList.find(a => a.id === profile.avatar_id);
          if (avatar) {
            setCurrentSelectedAvatar(avatar);
            setSavedAvatarSvg(avatar.svg);
          }
        }
      }
    };
    fetchProfile();
  }, []);

  // Temporary state for editing (only committed on Save)
  const [tempProfileName, setTempProfileName] = useState(profileName);
  const [tempProfileEmail, setTempProfileEmail] = useState(profileEmail);

  // Initialize temp values when modal opens
  useEffect(() => {
    if (showProfileModal) {
      setTempProfileName(profileName);
      setTempProfileEmail(profileEmail);
    }
  }, [showProfileModal, profileName, profileEmail]);

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
    {
      icon: Plus,
      label: 'New chat',
      onClick: () => {
        // Check if already on /chat/new to avoid unnecessary action
        if (window.location.pathname === '/chat/new') return;
        // Dispatch custom event that the chat page listens to
        window.dispatchEvent(new CustomEvent('new-chat-request'));
        // Also update URL to match (for visual consistency)
        if (window.location.pathname !== '/chat/new') {
          window.history.pushState({}, '', '/chat/new');
        }
      }
    },
    { icon: BookOpen, label: 'Articles', onClick: () => router.push('/articles') },
  ];

  const handleMenuClick = (item: MenuItem) => {
    // Just call onClick - router will handle navigation
    if (item.onClick) {
      item.onClick();
    }
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/login');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      setSavedAvatarSvg(null); // Clear SVG avatar
      setUploadedImage(null);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      await signOut();
      router.push('/login');

    } catch (error) {
      console.error('Delete account error:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteAccountConfirm(false);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 61 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "flex flex-col h-screen overflow-hidden relative font-['Almarai'] scrollbar-transparent",
        !isCollapsed && "backdrop-blur-xl bg-white/10",
        isCollapsed && "bg-transparent"
      )}
    >
      <style>{`
        /* Hide scrollbar by default - use width: 0 to completely hide */
        .scrollbar-transparent::-webkit-scrollbar,
        .scrollbar-transparent *::-webkit-scrollbar {
          width: 0;
          transition: width 0.2s ease;
        }
        .scrollbar-transparent::-webkit-scrollbar-track,
        .scrollbar-transparent *::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-transparent::-webkit-scrollbar-thumb,
        .scrollbar-transparent *::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        /* Show scrollbar on hover */
        .scrollbar-transparent:hover::-webkit-scrollbar,
        .scrollbar-transparent:hover *::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
      <TooltipProvider>
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-2 space-y-1">
        {/* Logo + Text - Shows expand/collapse icon on hover */}
        <div
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => {
            setIsLogoHovered(false);
            handleMouseLeave();
          }}
          onMouseMove={(e) => handleMouseMove(e, isCollapsed ? 'Expand' : 'Collapse')}
          onClick={onToggle}
          className={cn(
            "flex items-center gap-0 py-2 relative cursor-pointer rounded-lg transition-colors",
            isCollapsed ? "justify-center px-1 hover:bg-white/5" : "px-2"
          )}
        >
          {/* Logo */}
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {/* Calmify Logo - hidden when hovering and collapsed */}
            {(!isLogoHovered || !isCollapsed) && (
              <img
                src="/logo.svg"
                alt="Calmify Logo"
                className="w-14 h-14"
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
                <PanelLeftOpen className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </div>

          {/* Logo Text - Always with logo when expanded */}
          {!isCollapsed && (
            <p className="text-lg text-black -ml-3">
              Calmify AI
            </p>
          )}

          {/* Collapse icon - always visible when expanded */}
          {mounted && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-2"
              onMouseMove={(e) => handleMouseMove(e, 'Collapse', true)}
              onMouseLeave={handleMouseLeave}
            >
              <PanelLeftClose className="w-4 h-4 text-black" />
            </motion.div>
          )}
        </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Derive active state from pathname
              const isActive = pathname === '/chat/new' && item.label === 'New chat' ||
                               pathname === '/articles' && item.label === 'Articles';
              const isSpecial = item.label === 'New chat';

              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  onMouseMove={(e) => handleMouseMove(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${
                    isActive && !isSpecial
                      ? 'bg-white/10 text-black'
                      : 'text-black hover:bg-gray-200/50'
                  } ${isSpecial ? 'bg-white/5 hover:bg-gray-200/50' : ''}`}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 text-black" />
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

            {/* Conversation List */}
            <ConversationList currentConversationId={currentConversationId} isCollapsed={isCollapsed} />
          </div>

      {/* Footer - User Profile */}
      <div className="p-2 relative">
          <motion.div
            ref={profileButtonRef}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setDropdownPosition({
                x: isCollapsed ? rect.right + 8 : rect.left,
                y: rect.top - 180
              });
              setShowProfileDropdown(!showProfileDropdown);
            }}
            onMouseMove={(e) => handleMouseMove(e, 'Profile')}
            onMouseLeave={handleMouseLeave}
          >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20 overflow-hidden">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt={profileName}
                      className="w-full h-full object-cover"
                    />
                  ) : savedAvatarSvg ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {savedAvatarSvg}
                    </div>
                  ) : avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={profileName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">{profileName.charAt(0).toUpperCase()}</span>
                  )}
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
                      <p className="text-sm font-medium text-black truncate">{profileName.replace(/\s/g, '')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
      </div>

      {/* Click outside handler for dropdown */}
      {mounted && showProfileDropdown && createPortal(
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => setShowProfileDropdown(false)}
        />,
        document.body
      )}

      {/* Profile Dropdown - Rendered via portal */}
      {mounted && showProfileDropdown && (() => {
        console.log('Rendering dropdown, position:', dropdownPosition, 'isCollapsed:', isCollapsed);
        return createPortal(
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed z-[100] bg-[#1F2023] border border-[#444444] rounded-xl overflow-hidden shadow-2xl"
          style={{
            left: isCollapsed ? dropdownPosition.x : dropdownPosition.x + 10,
            top: dropdownPosition.y,
            width: '200px'
          }}
        >
          <div className="p-1">
            {/* Profile Option */}
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                setShowProfileModal(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors text-left"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </button>

            {/* Help Option */}
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                setShowHelpModal(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors text-left"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </button>

            {/* Settings Option */}
            <button
              onClick={() => {
                setShowProfileDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors text-left"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>

            <div className="h-px bg-white/10 my-1" />

            {/* Logout Option */}
            <button
              onClick={async () => {
                setShowProfileDropdown(false);
                await handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-white/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </motion.div>,
        document.body
        );
      })()}

      {/* Profile Modal - Rendered via portal */}
      {mounted && showProfileModal && createPortal(
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={() => setShowProfileModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto"
            >
              <div className="bg-[#1F2023] border border-[#444444] rounded-2xl overflow-hidden shadow-2xl w-[450px] font-['Almarai'] max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#444444] flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Profile</h2>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Profile Content */}
                <div className="p-6 space-y-6">
                  {/* AvatarPicker Section */}
                  <div id="avatar-picker-section" className="space-y-3">
                    <AvatarPicker
                      initialAvatar={currentSelectedAvatar}
                      uploadedImage={uploadedImage}
                      avatarUrl={avatarUrl}
                      profileName={profileName}
                      isUploading={isUploading}
                      onAvatarSelect={(avatar) => {
                        setCurrentSelectedAvatar(avatar);
                        setUploadedImage(null);
                        setAvatarUrl(null);
                      }}
                      onUploadClick={() => fileInputRef.current?.click()}
                    />
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Editable Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-gray-400 text-xs uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        value={tempProfileName}
                        onChange={(e) => setTempProfileName(e.target.value)}
                        className="w-full bg-white/5 border border-[#444444] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors font-['Almarai']"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-400 text-xs uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={tempProfileEmail}
                        onChange={(e) => setTempProfileEmail(e.target.value)}
                        className="w-full bg-white/5 border border-[#444444] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors font-['Almarai']"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-4 border-t border-[#444444]">
                    <button
                      onClick={() => setShowDeleteAccountConfirm(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors w-full"
                    >
                      <UserX className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>

                {/* Footer - Save/Cancel Buttons */}
                <div className="p-4 border-t border-[#444444] flex gap-3">
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 rounded-full px-6 py-2 text-black font-medium text-sm font-['Almarai'] transition-all"
                    style={{ backgroundColor: '#FFFFFF' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#999';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      // Commit temp values to main state
                      setProfileName(tempProfileName);
                      setProfileEmail(tempProfileEmail);
                      // Save avatar
                      if (currentSelectedAvatar) {
                        setSavedAvatarSvg(currentSelectedAvatar.svg);
                      }
                      // Update profile in database
                      try {
                        const supabase = createBrowserClient(
                          process.env.NEXT_PUBLIC_SUPABASE_URL!,
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                        );
                        const { data: { user } } = await supabase.auth.getUser();
                        if (user) {
                          const updateData = {
                            full_name: tempProfileName,
                            // If user uploaded a new photo, save avatar_url and clear avatar_id
                            // If user selected from picker, save avatar_id and clear avatar_url
                            // Otherwise keep existing avatar_url
                            ...(uploadedImage
                              ? { avatar_url: avatarUrl, avatar_id: null }
                              : currentSelectedAvatar
                              ? { avatar_id: currentSelectedAvatar.id, avatar_url: null }
                              : { avatar_url: avatarUrl || null, avatar_id: null }
                            ),
                          };
                          await supabase
                            .from('profiles')
                            .update(updateData)
                            .eq('id', user.id);
                        }
                      } catch (error) {
                        console.error('Error saving profile:', error);
                      }
                      setShowProfileModal(false);
                    }}
                    className="flex-1 rounded-full px-6 py-2 text-black font-medium text-sm font-['Almarai'] transition-all"
                    style={{ backgroundColor: '#FFFFFF' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#999';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>,
        document.body
      )}

      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      {/* Delete Account Confirmation Modal */}
      {mounted && showDeleteAccountConfirm && createPortal(
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={() => setShowDeleteAccountConfirm(false)}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pointer-events-auto bg-[#1F2023] border border-[#444444] rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-medium text-white mb-2">Delete Your Account?</h3>
              <p className="text-gray-400 text-sm mb-2">This action <strong className="text-red-400">cannot be undone</strong>. All your data including:</p>
              <ul className="text-gray-400 text-sm mb-4 ml-4 list-disc">
                <li>Chat history</li>
                <li>Profile information</li>
                <li>Settings & preferences</li>
              </ul>
              <p className="text-gray-400 text-sm mb-6">will be permanently deleted.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAccountConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </motion.div>
          </div>
        </>,
        document.body
      )}

      {/* Floating Tooltip */}
      {mounted && tooltip && showTooltip && createPortal(
        <div
          className="fixed pointer-events-none z-[100] px-3 py-1.5 text-sm text-white rounded-md border border-[#333333] font-['Almarai']"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: '#1F2023',
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
