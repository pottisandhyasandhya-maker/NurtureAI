(function () {
  const screens = {
    welcome: 'welcome_ai_daily_care_companion/code.html',
    setup: 'personal_setup_ai_daily_care_companion/code.html',
    home: 'home_dashboard_ai_daily_care_companion/code.html',
    agent: 'ai_daily_care_agent/code.html',
    routine: 'daily_routine_diet_ai_daily_care_companion/code.html',
    medicine: 'smart_medical_reminder_ai_daily_care_companion/code.html',
    medicineCamera: 'medicine_confirmation_camera_ai_daily_care_companion/code.html',
    health: 'ai_health_image_understanding_ai_daily_care_companion/code.html',
    appointment: 'hospital_appointment_ai_calling_ai_daily_care_companion/code.html',
    appointmentStatus: 'appointment_status_confirmation_ai_daily_care_companion/code.html',
    qr: 'health_qr_emergency_pass_ai_daily_care_companion/code.html',
    sos: 'emergency_sos_phc_dispatch_ai_daily_care_companion/code.html',
    phc: 'phc_emergency_triage_dashboard_ai_daily_care_companion/code.html',
    hospital: 'hospital_management_dashboard_ai_daily_care_companion/code.html',
    profile: 'profile_history_settings_ai_daily_care_companion/code.html'
  };

  const currentScreen = window.location.pathname.split('/').slice(-2, -1)[0] || 'welcome_ai_daily_care_companion';
  const go = (screen) => {
    if (screens[screen]) window.location.href = '../' + screens[screen];
  };

  const directRoutes = {
    'cta-get-started': 'setup',
    submitSetupBtn: 'home',
    aiMicBtn: 'agent',
    shutterBtn: 'medicine',
    'confirm-btn': 'routine',
    'unwell-btn': 'sos',
    'btn-review': 'appointmentStatus',
    'add-to-routine-btn': 'routine',
    'confirm-pin-btn': 'phc'
  };

  const bindDirectRoutes = () => {
    Object.entries(directRoutes).forEach(([id, screen]) => {
      const element = document.getElementById(id);
      if (element) element.addEventListener('click', () => go(screen));
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindDirectRoutes, { once: true });
  } else {
    bindDirectRoutes();
  }

  const textOf = (element) => (element.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const isButton = (element) => element && (element.matches('button, a') || element.closest('button, a'));
  const nearestButton = (element) => element.matches('button, a') ? element : element.closest('button, a');

  document.addEventListener('click', (event) => {
    const target = nearestButton(event.target);
    if (!target) return;

    const path = target.dataset.path;
    if (path) {
      event.preventDefault();
      const destinations = { home: 'home', 'ai-agent': 'agent', routine: 'routine', 'health-qr': 'qr', profile: 'profile' };
      if (destinations[path]) go(destinations[path]);
      return;
    }

    const id = target.id;
    const label = textOf(target);
    const aria = (target.getAttribute('aria-label') || '').toLowerCase();

    if (id === 'cta-get-started') return go('setup');
    if (id === 'submitSetupBtn') return go('home');
    if (id === 'aiMicBtn') return go('agent');
    if (id === 'shutterBtn') return go('medicine');
    if (id === 'confirm-btn') return go('routine');
    if (id === 'unwell-btn') return go('sos');
    if (id === 'btn-review') return go('appointmentStatus');
    if (id === 'add-to-routine-btn') return go('routine');
    if (id === 'confirm-pin-btn') return go('phc');

    if (currentScreen === 'home_dashboard_ai_daily_care_companion') {
      if (label.includes('ai care agent')) return go('agent');
      if (label.includes('medicine reminder')) return go('medicine');
      if (label.includes('daily routine')) return go('routine');
      if (label.includes('book appointment')) return go('appointment');
      if (label.includes('scan & understand')) return go('health');
      if (label.includes('health qr')) return go('qr');
      if (label.includes('emergency sos')) return go('sos');
    }

    if (currentScreen === 'ai_daily_care_agent') {
      if (label.includes('analyze this medicine')) return go('medicineCamera');
      if (label.includes('book me an appointment')) return go('appointment');
      if (label.includes('show my health qr')) return go('qr');
      if (label.includes('emergency help')) return go('sos');
    }

    if (currentScreen === 'ai_health_image_understanding_ai_daily_care_companion' && label.includes('add to my routine')) return go('routine');
    if (currentScreen === 'hospital_appointment_ai_calling_ai_daily_care_companion' && label.includes('confirm appointment')) return go('appointmentStatus');
    if (currentScreen === 'profile_history_settings_ai_daily_care_companion' && label.includes('phc / hospital')) return go('hospital');

    if (aria === 'ask ai companion') return go('agent');
    if (aria === 'profile' || aria.includes('profile')) return go('profile');
    if (aria === 'go back') return window.history.length > 1 ? window.history.back() : go('home');
  });
})();
