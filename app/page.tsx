'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, X, MessageCircle, User, Settings, Camera, LogOut, ChevronLeft, Send, ShieldCheck, Mail, Smartphone } from 'lucide-react';

// Mock Data for Demo
const MOCK_FEMALE_PROFILES = [
  { id: 1, name: 'Priya', age: 24, location: 'Hyderabad', distance: '5 km away', profession: 'Software Engineer', bio: 'Looking for something meaningful. Love hiking and trying new cafes.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 2, name: 'Anjali', age: 26, location: 'Mumbai', distance: '12 km away', profession: 'Designer', bio: 'Art, coffee, and good conversations.', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 3, name: 'Kavya', age: 23, location: 'Pune', distance: '2 km away', profession: 'Student', bio: 'Dog mom 🐶. Swipe right if you like bad puns.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 4, name: 'Sneha', age: 27, location: 'Delhi', distance: '8 km away', profession: 'Teacher', bio: 'Bibliophile and travel enthusiast.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=600' },
];

const MOCK_MALE_PROFILES = [
  { id: 5, name: 'Rahul', age: 28, location: 'Hyderabad', distance: '3 km away', profession: 'Data Scientist', bio: 'Gym on weekdays, biryani on weekends.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 6, name: 'Vikram', age: 25, location: 'Bangalore', distance: '15 km away', profession: 'Entrepreneur', bio: 'Building the future. Let\'s chat.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 7, name: 'Amit', age: 29, location: 'Mumbai', distance: '6 km away', profession: 'Photographer', bio: 'Always looking for the perfect shot.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 8, name: 'Karan', age: 26, location: 'Pune', distance: '1 km away', profession: 'Chef', bio: 'I can cook you the best meal of your life.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=600' },
];

const MOCK_CHATS = [
  { id: 101, name: 'Support Team', lastMessage: 'Your ID is under verification.', unread: 1, avatar: 'https://placehold.co/100x100/6366f1/ffffff?text=ST' },
  { id: 102, name: 'Match #1', lastMessage: 'Hey! How are you doing?', unread: 0, avatar: 'https://placehold.co/100x100/e2e8f0/475569?text=M1' },
];

export default function App() {
  // App State
  const [currentUser, setCurrentUser] = useState(null); // null means not logged in
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'discover', 'chatList', 'chat', 'profile'
  const [activeChat, setActiveChat] = useState(null);

  // Authentication Handlers
  const handleLogin = (gender) => {
    setCurrentUser({
      name: 'Demo User',
      gender: gender,
      verified: false, // Simulating the manual verification requirement
    });
    setCurrentView('discover');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('auth');
  };

  const AuthView = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-500 to-purple-600 text-white p-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <Heart className="w-16 h-16 mx-auto mb-4 fill-white" />
          <h1 className="text-4xl font-bold tracking-tight">Jateri</h1>
          <p className="text-indigo-100 text-lg">Find your perfect match in our community.</p>
        </div>

        <div className="w-full max-w-sm space-y-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-center mb-6">Create Demo Account</h2>
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-indigo-100 mb-2">I am a:</p>
            <button 
              onClick={() => handleLogin('male')}
              className="w-full py-3 px-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            >
              Male (Show Female Profiles)
            </button>
            <button 
              onClick={() => handleLogin('female')}
              className="w-full py-3 px-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            >
              Female (Show Male Profiles)
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-white/20 space-y-3">
             <button className="w-full py-3 px-4 bg-transparent border border-white/50 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Continue with Google
            </button>
            <button className="w-full py-3 px-4 bg-transparent border border-white/50 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5" /> Continue with Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DiscoverView = () => {
    // Select profiles opposite to current user's gender
    const initialProfiles = currentUser?.gender === 'male' ? MOCK_FEMALE_PROFILES : MOCK_MALE_PROFILES;
    const [profiles, setProfiles] = useState(initialProfiles);

    const removeProfile = (id) => {
      setTimeout(() => {
        setProfiles((current) => current.filter((p) => p.id !== id));
      }, 200); // Wait for animation
    };

    if (!currentUser?.verified) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
          <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Pending</h2>
          <p className="text-gray-500 mb-8">
            Your profile is currently under manual review by our community team. Please upload a valid ID to continue.
          </p>
          <button 
            onClick={() => setCurrentUser({...currentUser, verified: true})}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 w-full max-w-xs"
          >
            [Demo] Auto-Verify Me
          </button>
        </div>
      );
    }

    return (
      <div className="h-full relative bg-gray-100 flex flex-col overflow-hidden">
        {/* Swipe Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {profiles.length === 0 ? (
            <div className="text-center text-gray-500 p-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">No more profiles</h3>
              <p>Check back later for new matches!</p>
              <button 
                onClick={() => setProfiles(initialProfiles)}
                className="mt-6 text-indigo-600 font-medium"
              >
                Reset Demo Profiles
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {profiles.map((profile, index) => {
                // Only render top 2 cards for performance and stacking effect
                if (index > 1) return null;
                const isTopCard = index === 0;

                return (
                  <SwipeableCard 
                    key={profile.id} 
                    profile={profile} 
                    isTop={isTopCard} 
                    onSwipe={() => removeProfile(profile.id)} 
                  />
                );
              })}
            </AnimatePresence>
          )}
        </div>
        
        {/* Demo Bottom Nav */}
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    );
  };

  const SwipeableCard = ({ profile, isTop, onSwipe }) => {
    const x = useMotionValue(0);
    const controls = useAnimation();
    
    // Transform values based on swipe distance
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    
    // Action Indicators (Nope/Like stamps)
    const likeOpacity = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

    const handleDragEnd = async (e, { offset, velocity }) => {
      const swipeThreshold = 100;
      if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
        // Swiped off screen
        const direction = offset.x > 0 ? 1 : -1;
        await controls.start({ x: direction * 500, transition: { duration: 0.3 } });
        onSwipe();
      } else {
        // Snap back
        controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
      }
    };

    const handleButtonSwipe = async (direction) => {
      const dir = direction === 'right' ? 1 : -1;
      await controls.start({ x: dir * 500, transition: { duration: 0.3 } });
      onSwipe();
    };

    return (
      <motion.div
        className="absolute w-full max-w-md h-[70vh] p-4"
        style={{ 
          zIndex: isTop ? 10 : 0,
          x, 
          rotate, 
          opacity: isTop ? 1 : 0.8, 
          scale: isTop ? 1 : 0.95 
        }}
        drag={isTop ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white">
          <img src={profile.img} alt={profile.name} className="w-full h-full object-cover" draggable="false" />
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Swipe Stamps */}
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 rounded-lg p-2 transform -rotate-12 pointer-events-none">
            <span className="text-4xl font-bold text-green-500 uppercase tracking-wider">Like</span>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 rounded-lg p-2 transform rotate-12 pointer-events-none">
            <span className="text-4xl font-bold text-red-500 uppercase tracking-wider">Nope</span>
          </motion.div>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end gap-2 mb-1">
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <span className="text-2xl font-light">{profile.age}</span>
            </div>
            <p className="text-gray-200 flex items-center gap-2 text-sm mb-1">
              {profile.profession} • {profile.location}
            </p>
            <p className="text-gray-300 text-xs mb-3 flex items-center gap-1">
               {profile.distance}
            </p>
            <p className="text-sm line-clamp-2">{profile.bio}</p>
          </div>
        </div>

        {/* Action Buttons (Only interactive on top card) */}
        {isTop && (
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-6 z-20">
            <button 
              onClick={() => handleButtonSwipe('left')}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500 hover:scale-110 transition-transform"
            >
              <X className="w-8 h-8 stroke-[3]" />
            </button>
            <button 
              onClick={() => handleButtonSwipe('right')}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-green-500 hover:scale-110 transition-transform"
            >
              <Heart className="w-8 h-8 stroke-[3]" />
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  const ChatListView = () => (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_CHATS.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => { setActiveChat(chat); setCurrentView('chat'); }}
            className="flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
              <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );

  const ActiveChatView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3 shadow-sm">
        <button onClick={() => setCurrentView('chatList')} className="p-2 -ml-2 text-gray-500 hover:text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
        <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Dummy Messages */}
        <div className="flex gap-2">
           <img src={activeChat.avatar} className="w-8 h-8 rounded-full" />
           <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 max-w-[75%]">
             {activeChat.lastMessage}
           </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm"
          />
          <button className="text-indigo-600 p-1">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white pb-6 rounded-b-3xl shadow-sm">
          <div className="h-32 bg-gradient-to-r from-indigo-400 to-purple-500 relative">
            <button className="absolute top-4 right-4 p-2 text-white bg-black/20 rounded-full backdrop-blur-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 relative -mt-16 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-md mx-auto overflow-hidden">
                <img src={`https://placehold.co/400x400/e2e8f0/475569?text=${currentUser.name.charAt(0)}`} className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{currentUser.name}, 25</h2>
            <p className="text-gray-500">{currentUser.gender === 'male' ? 'Male' : 'Female'} • Hyderabad</p>
            
            {!currentUser.verified && (
               <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-100">
                  <ShieldCheck className="w-3 h-3" /> Verification Pending
               </div>
            )}
             {currentUser.verified && (
               <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100">
                  <ShieldCheck className="w-3 h-3" /> Verified Member
               </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Subscription</h3>
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-yellow-800">Free Tier</p>
                <p className="text-xs text-yellow-600">Upgrade for unlimited swipes</p>
              </div>
              <button className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold text-sm rounded-lg shadow-sm">
                View Plans
              </button>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-white text-red-500 font-semibold rounded-2xl shadow-sm flex items-center justify-center gap-2 border border-red-50"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </div>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );

  const BottomNav = ({ currentView, setCurrentView }) => (
    <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center pb-safe">
      <button 
        onClick={() => setCurrentView('discover')}
        className={`p-2 rounded-full transition-colors ${currentView === 'discover' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Heart className={`w-7 h-7 ${currentView === 'discover' ? 'fill-indigo-600' : ''}`} />
      </button>
      <button 
        onClick={() => setCurrentView('chatList')}
        className={`p-2 rounded-full transition-colors relative ${currentView.includes('chat') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <MessageCircle className={`w-7 h-7 ${currentView.includes('chat') ? 'fill-indigo-600' : ''}`} />
        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <button 
        onClick={() => setCurrentView('profile')}
        className={`p-2 rounded-full transition-colors ${currentView === 'profile' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <User className={`w-7 h-7 ${currentView === 'profile' ? 'fill-indigo-600' : ''}`} />
      </button>
    </div>
  );

  // Simulate a mobile phone screen for desktop preview
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] h-[850px] max-h-[95vh] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-800 flex flex-col">
        {/* Simulated Status Bar */}
        <div className="absolute top-0 w-full h-7 z-50 flex justify-center">
          <div className="w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
        </div>
        
        {/* App Content Router */}
        <div className="flex-1 pt-7 overflow-hidden">
          {currentView === 'auth' && <AuthView />}
          {currentUser && currentView === 'discover' && <DiscoverView />}
          {currentUser && currentView === 'chatList' && <ChatListView />}
          {currentUser && currentView === 'chat' && <ActiveChatView />}
          {currentUser && currentView === 'profile' && <ProfileView />}
        </div>
      </div>
    </div>
  );
}