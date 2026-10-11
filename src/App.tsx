import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Home, Building2, Briefcase, Store, BookOpen, User, LogIn, LogOut, Menu, X, MapPin, Clock, Search, Calendar, DollarSign, Eye, CheckCircle, AlertCircle, Shield, ArrowRight, Utensils, Coffee, Stethoscope, Banknote, GraduationCap, Dumbbell, Smartphone, Scissors, Bus, Scale, Wrench, FileText } from 'lucide-react';
import { AppProvider, useApp } from './context';
import { HOSTELS, JOBS, BUSINESSES, ARTICLES, login, logout, register, getBookings, getUserBookings, createBooking, updateBookingStatus, getApplications, getUserApplications, createApplication } from './store';

// ============ LAYOUT ============

function Header() {
  const { user, setUser, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/hostels', label: t('nav.hostels'), icon: Building2 },
    { path: '/jobs', label: t('nav.jobs'), icon: Briefcase },
    { path: '/services', label: t('nav.services'), icon: Store },
    { path: '/guides', label: t('nav.guides'), icon: BookOpen },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">Armenia Life Hub</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <User size={16} />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>
                {user.role === 'SUPER_ADMIN' && (
                  <Link to="/admin" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50">
                    <Shield size={16} />
                  </Link>
                )}
                <button onClick={handleLogout} className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                <LogIn size={16} />
                <span className="hidden sm:inline">{t('nav.login')}</span>
              </Link>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t py-3 animate-slide-down">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            {user && (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <User size={18} />
                <span className="font-medium">{t('nav.dashboard')}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="font-bold text-lg text-white">Armenia Life Hub</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">{t('footer.aboutText')}</p>
            <div className="mt-4 px-3 py-2 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
              <p className="text-xs text-yellow-300 flex items-center gap-2">
                <AlertCircle size={14} />
                {t('footer.demo')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <Link to="/hostels" className="block text-sm hover:text-white transition-colors">{t('nav.hostels')}</Link>
              <Link to="/jobs" className="block text-sm hover:text-white transition-colors">{t('nav.jobs')}</Link>
              <Link to="/services" className="block text-sm hover:text-white transition-colors">{t('nav.services')}</Link>
              <Link to="/guides" className="block text-sm hover:text-white transition-colors">{t('nav.guides')}</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">{t('footer.contact')}</h3>
            <p className="text-sm">{t('footer.email')}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// ============ HOME PAGE ============

function HomePage() {
  const { t } = useApp();

  const categories = [
    { icon: Building2, title: t('home.categories.hostels'), desc: t('home.categories.hostels.desc'), path: '/hostels', color: 'bg-blue-500' },
    { icon: Briefcase, title: t('home.categories.jobs'), desc: t('home.categories.jobs.desc'), path: '/jobs', color: 'bg-emerald-500' },
    { icon: Store, title: t('home.categories.services'), desc: t('home.categories.services.desc'), path: '/services', color: 'bg-purple-500' },
    { icon: BookOpen, title: t('home.categories.guides'), desc: t('home.categories.guides.desc'), path: '/guides', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-emerald-600 text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&h=800&fit=crop" alt="Armenia" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/80 via-primary-600/70 to-emerald-600/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{t('home.hero.title')}</h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{t('home.hero.subtitle')}</p>
          <div className="max-w-xl mx-auto bg-white rounded-xl p-2 flex shadow-xl">
            <input type="text" placeholder={t('home.hero.search')} className="flex-1 px-4 py-3 text-gray-800 rounded-lg outline-none text-sm" />
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2">
              <Search size={18} />
              <span className="hidden sm:inline">{t('common.search')}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-4`}>
                <cat.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.featured.hostels')}</h2>
          <Link to="/hostels" className="text-primary-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
            {t('home.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOSTELS.slice(0, 3).map(hostel => (
            <Link key={hostel.id} to={`/hostels/${hostel.slug}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 size={48} className="text-blue-300" />
                </div>
                <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary-600">
                  {hostel.rooms[0].pricePerNight.toLocaleString()} AMD{t('hostels.perNight')}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">{hostel.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} />{t(`city.${hostel.city}`)}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{hostel.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {hostel.amenities.slice(0, 3).map(a => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('home.featured.jobs')}</h2>
            <Link to="/jobs" className="text-primary-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              {t('home.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JOBS.slice(0, 4).map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase size={20} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.companyName}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={12} />{t(`city.${job.city}`)}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} />{job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} AMD</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('home.newcomer.title')}</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">{t('home.newcomer.desc')}</p>
          <Link to="/guides" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            {t('home.learnMore')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============ HOSTELS ============

function HostelsPage() {
  const { t } = useApp();
  const [cityFilter, setCityFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = HOSTELS.filter(h => {
    if (cityFilter && h.city !== cityFilter) return false;
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('hostels.title')}</h1>
        <p className="text-gray-500 mt-2">{t('hostels.subtitle')}</p>
        <div className="mt-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg inline-flex items-center gap-2 text-xs text-yellow-700">
          <AlertCircle size={14} /> {t('hostels.demo')}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder={t('hostels.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" />
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300">
            <option value="">{t('hostels.filter.city')}: {t('common.all')}</option>
            {['Yerevan', 'Gyumri', 'Sevan', 'Dilijan', 'Vanadzor'].map(c => (
              <option key={c} value={c}>{t(`city.${c}`)}</option>
            ))}
          </select>
          <button onClick={() => { setCityFilter(''); setSearch(''); }} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">
            {t('hostels.filter.reset')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(hostel => (
          <Link key={hostel.id} to={`/hostels/${hostel.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100">
            <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 size={40} className="text-blue-200" />
              </div>
              <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary-600">
                {hostel.rooms[0].pricePerNight.toLocaleString()} AMD{t('hostels.perNight')}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-500">{hostel.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} />{t(`city.${hostel.city}`)}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{hostel.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {hostel.amenities.slice(0, 4).map(a => (
                  <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">{t('common.noResults')}</div>}
    </div>
  );
}

function HostelDetailPage() {
  const { t, user } = useApp();
  const { slug } = useParams();
  const navigate = useNavigate();
  const hostel = HOSTELS.find(h => h.slug === slug);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!hostel) return <div className="max-w-7xl mx-auto px-4 py-16 text-center">{t('common.noResults')}</div>;

  const handleSubmitBooking = () => {
    if (!selectedRoom || !checkIn || !checkOut || !guestName || !guestEmail) return;
    const room = hostel.rooms.find(r => r.id === selectedRoom);
    if (!room) return;
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    createBooking({
      hostelId: hostel.id,
      userId: user?.id || 'guest',
      roomTypeId: selectedRoom,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      totalPrice: room.pricePerNight * nights,
    });
    setBookingSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
        {t('common.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6">
            <Building2 size={64} className="text-blue-300" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{hostel.name}</h1>
          <p className="text-gray-500 flex items-center gap-1 mt-2"><MapPin size={16} />{hostel.address}, {t(`city.${hostel.city}`)}</p>
          <p className="text-gray-700 mt-4 leading-relaxed">{hostel.description}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('hostels.amenities')}</h2>
            <div className="flex flex-wrap gap-2">
              {hostel.amenities.map(a => (
                <span key={a} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                  <CheckCircle size={14} className="text-emerald-500" />{a}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('hostels.rooms')}</h2>
            <div className="space-y-3">
              {hostel.rooms.map(room => (
                <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.description} • {room.beds} تخت</p>
                  </div>
                  <div className="text-end">
                    <p className="font-bold text-primary-600">{room.pricePerNight.toLocaleString()} AMD</p>
                    <p className="text-xs text-gray-500">{t('hostels.perNight')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('hostels.policies')}</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>{t('hostels.checkin')}:</strong> {hostel.checkInTime}</p>
              <p><strong>{t('hostels.checkout')}:</strong> {hostel.checkOutTime}</p>
              <p><strong>{t('hostels.cancellation')}:</strong> {hostel.cancellationPolicy}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">{t('hostels.booking.request')}</h3>
            {bookingSuccess ? (
              <div className="text-center py-4">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                <p className="text-emerald-700 font-medium">{t('hostels.booking.success')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('hostels.booking.pending')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('hostels.booking.payAtProperty')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm">
                  <option value="">انتخاب اتاق...</option>
                  {hostel.rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.name} - {r.pricePerNight.toLocaleString()} AMD</option>
                  ))}
                </select>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                <input type="number" min={1} max={10} value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={t('hostels.booking.guests')} />
                <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={t('hostels.booking.guestName')} />
                <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={t('hostels.booking.guestEmail')} />
                <button onClick={handleSubmitBooking} className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                  {t('hostels.booking.submit')}
                </button>
                <p className="text-xs text-gray-500 text-center">{t('hostels.booking.payAtProperty')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ JOBS ============

function JobsPage() {
  const { t } = useApp();
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = JOBS.filter(j => {
    if (cityFilter && j.city !== cityFilter) return false;
    if (typeFilter && j.employmentType !== typeFilter) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('jobs.title')}</h1>
        <p className="text-gray-500 mt-2">{t('jobs.subtitle')}</p>
        <div className="mt-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg inline-flex items-center gap-2 text-xs text-yellow-700">
          <AlertCircle size={14} /> {t('jobs.demo')}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input type="text" placeholder={t('jobs.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" />
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
            <option value="">{t('jobs.filter.city')}: {t('common.all')}</option>
            {['Yerevan', 'Gyumri', 'Sevan', 'Dilijan', 'Vanadzor'].map(c => <option key={c} value={c}>{t(`city.${c}`)}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
            <option value="">{t('jobs.filter.type')}: {t('common.all')}</option>
            <option value="full-time">{t('jobs.type.full-time')}</option>
            <option value="part-time">{t('jobs.type.part-time')}</option>
            <option value="contract">{t('jobs.type.contract')}</option>
            <option value="remote">{t('jobs.type.remote')}</option>
          </select>
          <button onClick={() => { setCityFilter(''); setTypeFilter(''); setSearch(''); }} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">
            {t('hostels.filter.reset')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(job => (
          <Link key={job.id} to={`/jobs/${job.id}`} className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase size={20} className="text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.companyName}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={12} />{t(`city.${job.city}`)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{t(`jobs.type.${job.employmentType}`)}</span>
                  <span className="flex items-center gap-1"><DollarSign size={12} />{job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} AMD</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{t('jobs.deadline')}: {job.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.languages.map(l => (
                    <span key={l} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">{t('common.noResults')}</div>}
    </div>
  );
}

function JobDetailPage() {
  const { t, user } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const job = JOBS.find(j => j.id === id);
  const [coverLetter, setCoverLetter] = useState('');
  const [applied, setApplied] = useState(false);

  if (!job) return <div className="max-w-4xl mx-auto px-4 py-16 text-center">{t('common.noResults')}</div>;

  const handleApply = () => {
    if (!coverLetter.trim()) return;
    createApplication({
      jobId: job.id,
      userId: user?.id || 'guest',
      coverLetter,
      applicantName: user?.name || 'کاربر مهمان',
      applicantEmail: user?.email || 'guest@example.com',
    });
    setApplied(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">{t('common.back')}</button>

      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Briefcase size={24} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-500">{job.companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{t('jobs.filter.city')}</p><p className="font-medium text-sm">{t(`city.${job.city}`)}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{t('jobs.filter.type')}</p><p className="font-medium text-sm">{t(`jobs.type.${job.employmentType}`)}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{t('jobs.salary')}</p><p className="font-medium text-sm">{job.salaryMin.toLocaleString()}-{job.salaryMax.toLocaleString()} AMD</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{t('jobs.deadline')}</p><p className="font-medium text-sm">{job.deadline}</p></div>
        </div>

        <div className="prose prose-sm max-w-none mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('common.details')}</h2>
          <p className="text-gray-700">{job.description}</p>
          <h2 className="text-lg font-semibold text-gray-900 mt-4">{t('jobs.requirements')}</h2>
          <p className="text-gray-700">{job.requirements}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('jobs.languages')}</h2>
          <div className="flex flex-wrap gap-2">
            {job.languages.map(l => <span key={l} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{l}</span>)}
          </div>
        </div>

        {applied ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-emerald-700 font-medium">{t('jobs.apply.success')}</p>
          </div>
        ) : (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('jobs.apply')}</h2>
            <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={4} placeholder={t('jobs.apply.coverLetter')} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300 resize-none" />
            <button onClick={handleApply} className="mt-3 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
              {t('jobs.apply.submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ SERVICES ============

function ServicesPage() {
  const { t } = useApp();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [search, setSearch] = useState('');

  const categories = [...new Set(BUSINESSES.map(b => b.category))];

  const filtered = BUSINESSES.filter(b => {
    if (categoryFilter && b.category !== categoryFilter) return false;
    if (cityFilter && b.city !== cityFilter) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('services.title')}</h1>
        <p className="text-gray-500 mt-2">{t('services.subtitle')}</p>
        <div className="mt-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg inline-flex items-center gap-2 text-xs text-yellow-700">
          <AlertCircle size={14} /> {t('services.demo')}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input type="text" placeholder={t('services.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
            <option value="">{t('services.filter.category')}: {t('common.all')}</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
            <option value="">{t('services.filter.city')}: {t('common.all')}</option>
            {['Yerevan', 'Gyumri', 'Sevan', 'Dilijan', 'Vanadzor'].map(c => <option key={c} value={c}>{t(`city.${c}`)}</option>)}
          </select>
          <button onClick={() => { setCategoryFilter(''); setCityFilter(''); setSearch(''); }} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">{t('hostels.filter.reset')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(biz => (
          <div key={biz.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Store size={18} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{biz.name}</h3>
                  {biz.verified && <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-500">{biz.category}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{biz.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={12} />{t(`city.${biz.city}`)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{biz.hours}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {biz.languages.slice(0, 3).map(l => (
                    <span key={l} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">{t('common.noResults')}</div>}
    </div>
  );
}

// ============ GUIDES ============

function GuidesPage() {
  const { t } = useApp();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [search, setSearch] = useState('');

  const categories = [...new Set(ARTICLES.map(a => a.category))];

  const filtered = ARTICLES.filter(a => {
    if (categoryFilter && a.category !== categoryFilter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('guides.title')}</h1>
        <p className="text-gray-500 mt-2">{t('guides.subtitle')}</p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder={t('guides.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
            <option value="">{t('guides.filter.category')}: {t('common.all')}</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { setCategoryFilter(''); setSearch(''); }} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">{t('hostels.filter.reset')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(article => (
          <Link key={article.id} to={`/guides/${article.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group">
            <div className="h-36 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
              <BookOpen size={32} className="text-orange-200" />
            </div>
            <div className="p-4">
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{article.category}</span>
              <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-primary-500 transition-colors">{article.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                <span>{article.readingTime} {t('guides.readTime')}</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">{t('common.noResults')}</div>}
    </div>
  );
}

function GuideDetailPage() {
  const { t } = useApp();
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) return <div className="max-w-4xl mx-auto px-4 py-16 text-center">{t('common.noResults')}</div>;

  const related = ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate('/guides')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">{t('guides.back')}</button>

      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{article.category}</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">{article.title}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span>{article.readingTime} {t('guides.readTime')}</span>
          <span>{t('guides.published')}: {article.publishedAt}</span>
        </div>
        <div className="mt-6 prose prose-sm max-w-none text-gray-700 leading-relaxed">
          <p>{article.content}</p>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('guides.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/guides/${r.slug}`} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <h3 className="font-medium text-gray-900 text-sm">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{r.readingTime} {t('guides.readTime')}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ AUTH ============

function LoginPage() {
  const { t, setUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      setError(t('auth.error.invalid'));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = register(email, password, name);
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      setError(t('auth.error.exists'));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">AL</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{isRegister ? t('auth.register') : t('auth.login')}</h1>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">{error}</div>}

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
            {isRegister && (
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('auth.name')} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" required />
            )}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('auth.email')} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('auth.password')} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-300" required />
            <button type="submit" className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              {isRegister ? t('auth.registerButton') : t('auth.loginButton')}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            {isRegister ? (
              <>{t('auth.hasAccount')} <button onClick={() => setIsRegister(false)} className="text-primary-500 font-medium">{t('auth.login')}</button></>
            ) : (
              <>{t('auth.noAccount')} <button onClick={() => setIsRegister(true)} className="text-primary-500 font-medium">{t('auth.register')}</button></>
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">{t('auth.demoAccounts')}</p>
            <div className="space-y-1.5">
              {[
                { role: 'مدیر', email: 'admin@demo.example.com', pass: 'DemoAdmin!2026#Hub' },
                { role: 'مدیر هاستل', email: 'hostel.manager@demo.example.com', pass: 'DemoHostel!2026#Hub' },
                { role: 'کارفرما', email: 'employer@demo.example.com', pass: 'DemoEmployer!2026#Hub' },
                { role: 'جوینده کار', email: 'jobseeker@demo.example.com', pass: 'DemoSeeker!2026#Hub' },
                { role: 'مهمان', email: 'guest@demo.example.com', pass: 'DemoGuest!2026#Hub' },
              ].map(d => (
                <button key={d.email} onClick={() => { setEmail(d.email); setPassword(d.pass); }} className="w-full text-start px-3 py-2 bg-gray-50 rounded-lg text-xs hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-700">{d.role}:</span>
                  <span className="text-gray-500 ms-2">{d.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============

function DashboardPage() {
  const { t, user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const bookings = getUserBookings(user.id);
  const applications = getUserApplications(user.id);

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-gray-100 text-gray-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
    SUBMITTED: 'bg-yellow-100 text-yellow-700',
    UNDER_REVIEW: 'bg-blue-100 text-blue-700',
    HIRED: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
          <User size={24} className="text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email} • {user.role}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'bookings' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
          <Building2 size={16} />{t('dashboard.bookings')}
        </button>
        <button onClick={() => setActiveTab('applications')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'applications' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
          <Briefcase size={16} />{t('dashboard.applications')}
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl">{t('dashboard.noBookings')}</div>
          ) : (
            bookings.map(b => {
              const hostel = HOSTELS.find(h => h.id === b.hostelId);
              return (
                <div key={b.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{hostel?.name || 'هاستل'}</h3>
                      <p className="text-sm text-gray-500">{b.checkIn} → {b.checkOut} • {b.guests} مهمان</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>{t(`status.${b.status}`)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-3">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl">{t('dashboard.noApplications')}</div>
          ) : (
            applications.map(a => {
              const job = JOBS.find(j => j.id === a.jobId);
              return (
                <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{job?.title || 'شغل'}</h3>
                      <p className="text-sm text-gray-500">{job?.companyName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[a.status]}`}>{t(`status.${a.status}`)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// ============ ADMIN ============

function AdminPage() {
  const { t, user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'SUPER_ADMIN') navigate('/');
  }, [user, navigate]);

  if (!user || user.role !== 'SUPER_ADMIN') return null;

  const allBookings = getBookings();
  const pendingBookings = allBookings.filter(b => b.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield size={28} className="text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.totalUsers')}</p>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.totalHostels')}</p>
          <p className="text-2xl font-bold text-gray-900">{HOSTELS.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.pendingBookings')}</p>
          <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.totalJobs')}</p>
          <p className="text-2xl font-bold text-gray-900">{JOBS.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.totalBusinesses')}</p>
          <p className="text-2xl font-bold text-gray-900">{BUSINESSES.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('admin.stats.publishedArticles')}</p>
          <p className="text-2xl font-bold text-gray-900">{ARTICLES.filter(a => a.status === 'published').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">{t('admin.bookings')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-start px-4 py-3 font-medium text-gray-600">مهمان</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">هاستل</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">تاریخ‌ها</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">{t('common.status')}</th>
                <th className="text-start px-4 py-3 font-medium text-gray-600">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.slice(0, 10).map(b => {
                const hostel = HOSTELS.find(h => h.id === b.hostelId);
                return (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3">{b.guestName}</td>
                    <td className="px-4 py-3">{hostel?.name}</td>
                    <td className="px-4 py-3 text-xs">{b.checkIn} → {b.checkOut}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">{t(`status.${b.status}`)}</span></td>
                    <td className="px-4 py-3">
                      {b.status === 'PENDING' && (
                        <div className="flex gap-1">
                          <button onClick={() => { updateBookingStatus(b.id, 'CONFIRMED'); window.location.reload(); }} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs hover:bg-emerald-200">تأیید</button>
                          <button onClick={() => { updateBookingStatus(b.id, 'REJECTED'); window.location.reload(); }} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">رد</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hostels" element={<HostelsPage />} />
        <Route path="/hostels/:slug" element={<HostelDetailPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuideDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
