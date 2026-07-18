import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Inbox, MessageSquare, Mail, RefreshCw, Check, X,
  ExternalLink, LogOut, CheckCircle, Clock, AlertTriangle, ChevronRight, Eye, ShieldCheck
} from 'lucide-react';
import { AppointmentBooking, QuoteRequest, ContactSubmission, EmailLog } from '../types';

interface GoogleConnectionState {
  connected: boolean;
  email: string | null;
  expiry: number | null;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'quotes' | 'contacts' | 'emails'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [googleStatus, setGoogleStatus] = useState<GoogleConnectionState>({
    connected: false,
    email: null,
    expiry: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

  // Fetch all administrative data from the server
  const fetchAdminData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
        setQuotes(data.quotes || []);
        setContacts(data.contacts || []);
        setEmails(data.emails || []);
      }

      const gRes = await fetch('/api/admin/google-status');
      if (gRes.ok) {
        const gData = await gRes.json();
        setGoogleStatus({
          connected: gData.connected,
          email: gData.email,
          expiry: gData.expiry
        });
      }
    } catch (e) {
      console.error('[Fetch Admin Data Fail]', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();

    // Hook to listen to message from google auth callback popup window
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        console.log('[Admin] Received auth success message from popup!');
        fetchAdminData(true);
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchAdminData(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Google Calendar integration initiation
  const handleConnectGoogle = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          // Open popup safely in preview iframe environment
          const width = 600;
          const height = 700;
          const left = window.screen.width / 2 - width / 2;
          const top = window.screen.height / 2 - height / 2;
          window.open(
            data.url,
            'GoogleCalendarAuth',
            `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
          );
        }
      }
    } catch (e) {
      console.error('[Google Connect URL Fetch Fail]', e);
    }
  };

  const handleDisconnectGoogle = async () => {
    if (!confirm('Are you sure you want to disconnect Google Calendar? This will stop future consultation syncs.')) return;
    try {
      const res = await fetch('/api/admin/google-disconnect', { method: 'POST' });
      if (res.ok) {
        fetchAdminData(true);
      }
    } catch (e) {
      console.error('[Google Disconnect Fail]', e);
    }
  };

  // Update Status Helpers
  const handleUpdateContactStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateQuoteStatus = async (id: string, status: QuoteRequest['status']) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: AppointmentBooking['status']) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, googleEventId: status === 'cancelled' ? undefined : a.googleEventId } : a));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Helpers for formatting
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatDateTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#0F1A12] pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#E3DEC9] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0B6B3A] font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-[#D1A153]" />
              Verdara Administrative Suite
            </div>
            <h1 className="font-serif font-extrabold text-3xl md:text-4xl text-[#0F1A12] tracking-tight">
              Inquiry & Operations Control
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 h-10 rounded-full border border-[#E3DEC9] hover:bg-white text-xs font-bold transition-all disabled:opacity-70 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Console
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-4 h-10 rounded-full bg-[#0F1A12] text-white hover:opacity-90 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Live Website
            </a>
          </div>
        </div>

        {/* Integration Status bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Stats widget 1 */}
          <div className="md:col-span-3 bg-white border border-[#E3DEC9] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] border border-[#E3DEC9]/50 flex items-center justify-center text-[#D1A153]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#6D7870] font-bold uppercase tracking-wider block">Consultations</span>
              <strong className="text-2xl font-serif text-[#0F1A12]">{appointments.length}</strong>
              <span className="text-[10px] text-[#0B6B3A] block font-sans">Synced on request</span>
            </div>
          </div>

          {/* Stats widget 2 */}
          <div className="md:col-span-3 bg-white border border-[#E3DEC9] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] border border-[#E3DEC9]/50 flex items-center justify-center text-[#D1A153]">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#6D7870] font-bold uppercase tracking-wider block">Design Proposals</span>
              <strong className="text-2xl font-serif text-[#0F1A12]">{quotes.length}</strong>
              <span className="text-[10px] text-[#0B6B3A] block font-sans">Budget models ready</span>
            </div>
          </div>

          {/* Stats widget 3 */}
          <div className="md:col-span-6 bg-white border border-[#E3DEC9] rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                googleStatus.connected 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                  : 'bg-amber-50 border-amber-200 text-amber-600'
              }`}>
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-[#6D7870] font-bold uppercase tracking-wider block">Google Calendar Sync</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${googleStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <strong className="text-sm font-sans text-[#0F1A12]">
                    {googleStatus.connected ? `Connected (${googleStatus.email})` : 'Disconnected'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              {googleStatus.connected ? (
                <button
                  onClick={handleDisconnectGoogle}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-rose-200/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={handleConnectGoogle}
                  className="px-4 py-2 bg-[#0B6B3A] hover:bg-[#0B512C] text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Link Admin Calendar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Sidebar */}
          <div className="lg:col-span-3 space-y-2 bg-white border border-[#E3DEC9] p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D7870] px-3 block mb-3">Categories</span>
            
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-[#0F1A12] text-white shadow-md'
                  : 'text-[#6D7870] hover:bg-[#F4EFEA] hover:text-[#0F1A12]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Consultation Bookings</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'appointments' ? 'bg-white/20 text-white' : 'bg-[#F4EFEA] text-[#0F1A12]'
              }`}>
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#0F1A12] text-white shadow-md'
                  : 'text-[#6D7870] hover:bg-[#F4EFEA] hover:text-[#0F1A12]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Project Proposals</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'quotes' ? 'bg-white/20 text-white' : 'bg-[#F4EFEA] text-[#0F1A12]'
              }`}>
                {quotes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-[#0F1A12] text-white shadow-md'
                  : 'text-[#6D7870] hover:bg-[#F4EFEA] hover:text-[#0F1A12]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>General Contacts</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-[#F4EFEA] text-[#0F1A12]'
              }`}>
                {contacts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-[#0F1A12] text-white shadow-md'
                  : 'text-[#6D7870] hover:bg-[#F4EFEA] hover:text-[#0F1A12]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" />
                <span>Outbox Logs</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'emails' ? 'bg-white/20 text-white' : 'bg-[#F4EFEA] text-[#0F1A12]'
              }`}>
                {emails.length}
              </span>
            </button>

            <div className="border-t border-[#E3DEC9] pt-4 mt-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D7870] px-3 block mb-2">Dev Setup Note</span>
              <p className="text-[10px] text-[#6D7870] px-3 leading-relaxed">
                SMTP and Google credentials are live. When not configured, mail runs in <strong>simulated mode</strong> logging full records to the local database.
              </p>
            </div>
          </div>

          {/* Main List Window */}
          <div className="lg:col-span-9 bg-white border border-[#E3DEC9] rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <RefreshCw className="w-8 h-8 text-[#0B6B3A] animate-spin mb-4" />
                <p className="text-sm font-medium text-[#6D7870]">Retrieving secure records...</p>
              </div>
            ) : (
              <>
                {/* 1. APPOINTMENTS TAB */}
                {activeTab === 'appointments' && (
                  <div>
                    <div className="p-6 border-b border-[#E3DEC9] bg-[#FCFCFA] flex justify-between items-center">
                      <h3 className="font-serif font-bold text-lg text-[#0F1A12]">Consultation Bookings</h3>
                      <span className="text-xs text-[#6D7870]">Syncs with connected Google accounts</span>
                    </div>

                    {appointments.length === 0 ? (
                      <div className="py-24 text-center text-[#6D7870] text-xs">
                        <Calendar className="w-12 h-12 text-[#E3DEC9] mx-auto mb-3" />
                        No consultation bookings recorded yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#F4EFEA] border-b border-[#E3DEC9] text-[#0F1A12] font-bold">
                              <th className="p-4 w-32">Reference ID</th>
                              <th className="p-4">Customer Details</th>
                              <th className="p-4">Schedule Requested</th>
                              <th className="p-4">Service Required</th>
                              <th className="p-4 w-28 text-center">Calendar Sync</th>
                              <th className="p-4 w-32 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E3DEC9]/50">
                            {appointments.map((apt) => (
                              <tr key={apt.id} className="hover:bg-[#FCFCFA] transition-colors">
                                <td className="p-4 align-top font-mono font-bold text-[#0B6B3A]">{apt.id}</td>
                                <td className="p-4 align-top space-y-1">
                                  <div className="font-bold text-[#0F1A12] text-sm">{apt.name}</div>
                                  <div className="text-white/80 bg-[#0F1A12] inline-block rounded px-1.5 py-0.5 text-[10px] font-mono select-all">
                                    {apt.email}
                                  </div>
                                  <div className="text-[#6D7870] font-sans">{apt.phone}</div>
                                  {apt.message && (
                                    <div className="mt-2 text-[#6D7870] bg-muted/30 border border-muted/50 rounded-lg p-2 max-w-xs italic text-[11px] leading-relaxed">
                                      "{apt.message}"
                                    </div>
                                  )}
                                </td>
                                <td className="p-4 align-top">
                                  <div className="font-bold text-[#0F1A12]">{formatDate(apt.date)}</div>
                                  <div className="text-[#6D7870] mt-0.5 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {apt.timeSlot}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground mt-1">
                                    Booked: {formatDateTime(apt.createdAt)}
                                  </div>
                                </td>
                                <td className="p-4 align-top font-bold text-[#0F1A12]">{apt.serviceType}</td>
                                <td className="p-4 align-top text-center">
                                  {apt.googleEventId ? (
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                                      Synced
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                                      <Clock className="w-3 h-3 text-amber-600" />
                                      Local
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 align-top text-right space-y-2">
                                  {apt.status === 'pending' && (
                                    <div className="flex flex-col gap-1.5">
                                      <button
                                        onClick={() => handleUpdateAppointmentStatus(apt.id, 'confirmed')}
                                        className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[10px] text-center hover:bg-emerald-700 transition-all cursor-pointer"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleUpdateAppointmentStatus(apt.id, 'cancelled')}
                                        className="px-2.5 py-1.5 border border-rose-200 text-rose-700 rounded-lg font-bold text-[10px] text-center hover:bg-rose-50 transition-all cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                  {apt.status === 'confirmed' && (
                                    <div className="space-y-1">
                                      <span className="block text-center bg-emerald-100 text-emerald-800 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase">Approved</span>
                                      <button
                                        onClick={() => handleUpdateAppointmentStatus(apt.id, 'cancelled')}
                                        className="w-full px-2 py-1 text-[10px] hover:underline text-rose-600 cursor-pointer text-right"
                                      >
                                        Cancel Sync
                                      </button>
                                    </div>
                                  )}
                                  {apt.status === 'cancelled' && (
                                    <span className="block text-center bg-rose-50 text-rose-800 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase">Cancelled</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. QUOTES TAB */}
                {activeTab === 'quotes' && (
                  <div>
                    <div className="p-6 border-b border-[#E3DEC9] bg-[#FCFCFA] flex justify-between items-center">
                      <h3 className="font-serif font-bold text-lg text-[#0F1A12]">Project Proposals</h3>
                      <span className="text-xs text-[#6D7870]">Estimator and Custom Design requests</span>
                    </div>

                    {quotes.length === 0 ? (
                      <div className="py-24 text-center text-[#6D7870] text-xs">
                        <Inbox className="w-12 h-12 text-[#E3DEC9] mx-auto mb-3" />
                        No quote requests submitted yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#F4EFEA] border-b border-[#E3DEC9] text-[#0F1A12] font-bold">
                              <th className="p-4 w-32">Reference ID</th>
                              <th className="p-4">Customer Details</th>
                              <th className="p-4">Project Parameters</th>
                              <th className="p-4">Scope / Budget</th>
                              <th className="p-4 w-32 text-right">Status Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E3DEC9]/50">
                            {quotes.map((q) => (
                              <tr key={q.id} className="hover:bg-[#FCFCFA] transition-colors">
                                <td className="p-4 align-top font-mono font-bold text-[#0B6B3A]">{q.id}</td>
                                <td className="p-4 align-top space-y-1">
                                  <div className="font-bold text-[#0F1A12] text-sm">{q.name}</div>
                                  <div className="text-[#0B6B3A] font-bold font-mono">{q.email}</div>
                                  <div className="text-[#6D7870]">{q.phone}</div>
                                  {q.message && (
                                    <div className="mt-2 text-[#6D7870] bg-muted/30 border border-muted/50 rounded-lg p-2 max-w-xs italic text-[11px] leading-relaxed">
                                      "{q.message}"
                                    </div>
                                  )}
                                </td>
                                <td className="p-4 align-top space-y-1">
                                  <div><span className="text-muted-foreground">Desired Timeline:</span> <strong className="text-[#0F1A12]">{q.timeline}</strong></div>
                                  <div className="text-[10px] text-muted-foreground">Received: {formatDateTime(q.createdAt)}</div>
                                </td>
                                <td className="p-4 align-top">
                                  <div className="font-bold text-[#0F1A12]">{q.projectType}</div>
                                  <div className="text-[#0B6B3A] font-bold mt-1 text-sm bg-emerald-50 rounded px-2 py-0.5 inline-block">
                                    Budget: {q.budget}
                                  </div>
                                </td>
                                <td className="p-4 align-top text-right">
                                  {q.status === 'pending' ? (
                                    <div className="flex flex-col gap-1.5">
                                      <button
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'reviewed')}
                                        className="px-2.5 py-1.5 bg-[#0F1A12] text-white rounded-lg font-bold text-[10px] text-center hover:opacity-90 cursor-pointer"
                                      >
                                        Mark Reviewed
                                      </button>
                                      <button
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'archived')}
                                        className="px-2.5 py-1.5 border border-[#E3DEC9] text-[#6D7870] rounded-lg font-bold text-[10px] text-center hover:bg-muted cursor-pointer"
                                      >
                                        Archive
                                      </button>
                                    </div>
                                  ) : (
                                    <span className={`block text-center rounded px-2 py-1 text-[10px] font-bold uppercase ${
                                      q.status === 'reviewed' ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      {q.status}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. CONTACT SUBMISSIONS TAB */}
                {activeTab === 'contacts' && (
                  <div>
                    <div className="p-6 border-b border-[#E3DEC9] bg-[#FCFCFA] flex justify-between items-center">
                      <h3 className="font-serif font-bold text-lg text-[#0F1A12]">General Contacts</h3>
                      <span className="text-xs text-[#6D7870]">Direct user comments and service inquires</span>
                    </div>

                    {contacts.length === 0 ? (
                      <div className="py-24 text-center text-[#6D7870] text-xs">
                        <MessageSquare className="w-12 h-12 text-[#E3DEC9] mx-auto mb-3" />
                        No contact submissions recorded yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#F4EFEA] border-b border-[#E3DEC9] text-[#0F1A12] font-bold">
                              <th className="p-4 w-32">Reference ID</th>
                              <th className="p-4">Client Contact</th>
                              <th className="p-4">Subject Focus</th>
                              <th className="p-4">Inquiry Context</th>
                              <th className="p-4 w-32 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E3DEC9]/50">
                            {contacts.map((c) => (
                              <tr key={c.id} className="hover:bg-[#FCFCFA] transition-colors">
                                <td className="p-4 align-top font-mono font-bold text-[#0B6B3A]">{c.id}</td>
                                <td className="p-4 align-top space-y-1">
                                  <div className="font-bold text-[#0F1A12] text-sm">{c.name}</div>
                                  <div className="text-muted-foreground select-all">{c.email}</div>
                                  {c.phone && <div className="text-[#6D7870]">{c.phone}</div>}
                                  <div className="text-[10px] text-muted-foreground mt-2">Received: {formatDateTime(c.createdAt)}</div>
                                </td>
                                <td className="p-4 align-top font-bold text-[#0F1A12]">{c.subject}</td>
                                <td className="p-4 align-top font-sans text-[#6D7870] leading-relaxed italic max-w-sm">
                                  "{c.message}"
                                </td>
                                <td className="p-4 align-top text-right">
                                  {c.status === 'pending' ? (
                                    <div className="flex flex-col gap-1.5">
                                      <button
                                        onClick={() => handleUpdateContactStatus(c.id, 'reviewed')}
                                        className="px-2.5 py-1.5 bg-[#0F1A12] text-white rounded-lg font-bold text-[10px] text-center hover:opacity-90 cursor-pointer"
                                      >
                                        Mark Replied
                                      </button>
                                      <button
                                        onClick={() => handleUpdateContactStatus(c.id, 'archived')}
                                        className="px-2.5 py-1.5 border border-[#E3DEC9] text-[#6D7870] rounded-lg font-bold text-[10px] text-center hover:bg-muted cursor-pointer"
                                      >
                                        Archive
                                      </button>
                                    </div>
                                  ) : (
                                    <span className={`block text-center rounded px-2 py-1 text-[10px] font-bold uppercase ${
                                      c.status === 'reviewed' ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      {c.status}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. EMAILS TAB */}
                {activeTab === 'emails' && (
                  <div>
                    <div className="p-6 border-b border-[#E3DEC9] bg-[#FCFCFA] flex justify-between items-center">
                      <h3 className="font-serif font-bold text-lg text-[#0F1A12]">Branded System Outbox Logs</h3>
                      <span className="text-xs text-[#6D7870]">Real-time audit records of templates sent</span>
                    </div>

                    {emails.length === 0 ? (
                      <div className="py-24 text-center text-[#6D7870] text-xs">
                        <Mail className="w-12 h-12 text-[#E3DEC9] mx-auto mb-3" />
                        No outgoing mail logged yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#F4EFEA] border-b border-[#E3DEC9] text-[#0F1A12] font-bold">
                              <th className="p-4 w-44">Dispatched Timestamp</th>
                              <th className="p-4">Recipient</th>
                              <th className="p-4">Subject Line</th>
                              <th className="p-4 w-32">Mailer State</th>
                              <th className="p-4 w-24 text-right">View Copy</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E3DEC9]/50">
                            {emails.map((m) => (
                              <tr key={m.id} className="hover:bg-[#FCFCFA] transition-colors">
                                <td className="p-4 align-top font-mono text-[#6D7870]">{formatDateTime(m.sentAt)}</td>
                                <td className="p-4 align-top font-bold text-[#0F1A12] select-all">{m.to}</td>
                                <td className="p-4 align-top text-[#0F1A12] font-medium">{m.subject}</td>
                                <td className="p-4 align-top">
                                  {m.simulated ? (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 rounded px-1.5 py-0.5 text-[10px] font-bold">
                                      Simulated Log
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5 text-[10px] font-bold">
                                      SMTP Transmitted
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 align-top text-right">
                                  <button
                                    onClick={() => setSelectedEmail(m)}
                                    className="px-2.5 h-8 bg-[#0F1A12] hover:opacity-90 text-white rounded-lg font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer transition-all"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    Review
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* EMAIL AUDIT MODAL (Renders full styled HTML copy for secure visual check) */}
        {selectedEmail && (
          <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] border border-[#E3DEC9] w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-250">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-[#E3DEC9] bg-[#FCFCFA] flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6D7870]">System Outbox Visual Auditor</span>
                  <h4 className="font-serif font-bold text-[#0F1A12] text-lg mt-0.5">{selectedEmail.subject}</h4>
                  <div className="text-[11px] text-[#6D7870] mt-1">
                    To: <strong className="text-[#0F1A12] select-all">{selectedEmail.to}</strong> | Time: {formatDateTime(selectedEmail.sentAt)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="w-9 h-9 rounded-full hover:bg-muted text-[#6D7870] flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content - Rendering raw generated HTML inside secure iframe */}
              <div className="flex-1 bg-[#F5F5F3] p-6 relative">
                <iframe
                  title="Branded Email Visual Check"
                  srcDoc={selectedEmail.html}
                  className="w-full h-full bg-white rounded-2xl border border-[#E3DEC9] shadow-inner"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[#E3DEC9] bg-[#FCFCFA] text-center flex justify-between items-center px-6">
                <span className="text-[10px] text-[#6D7870] flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Fully styled with brand elements and design headers
                </span>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="px-5 h-9 bg-[#0F1A12] text-white rounded-full text-xs font-bold hover:opacity-95 transition-all cursor-pointer"
                >
                  Close Audit Window
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
