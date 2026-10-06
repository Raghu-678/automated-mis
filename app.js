/**
 * TARGO SMART MIS — AUTOMATED BUSINESS REPORTING PLATFORM
 * Core Application Logic & Interactive Chart.js Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. VIDEO AUTOPLAY ROBUSTNESS ENGINE (Exact Specification)
  // ---------------------------------------------------------------------------
  const heroVideo = document.getElementById('hero-video');
  const aboutVideo = document.getElementById('about-video');

  const setupVideoAutoplay = (videoEl) => {
    if (!videoEl) return;
    videoEl.muted = true;
    videoEl.playsInline = true;

    const tryPlay = () => {
      videoEl.muted = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Swallow rejections silently
        });
      }
    };

    tryPlay();
    const intervalId = setInterval(() => {
      if (videoEl.paused) {
        tryPlay();
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    const onFirstUserInteraction = () => {
      tryPlay();
      document.removeEventListener('click', onFirstUserInteraction);
      document.removeEventListener('touchstart', onFirstUserInteraction);
    };

    document.addEventListener('click', onFirstUserInteraction, { once: true });
    document.addEventListener('touchstart', onFirstUserInteraction, { once: true });
  };

  setupVideoAutoplay(heroVideo);
  setupVideoAutoplay(aboutVideo);

  // ---------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU CONTROLLER
  // ---------------------------------------------------------------------------
  const mobileHamburgerBtn = document.getElementById('mobile-hamburger-btn');
  const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

  if (mobileHamburgerBtn && mobileNavDropdown) {
    mobileHamburgerBtn.addEventListener('click', () => {
      const isExpanded = mobileHamburgerBtn.getAttribute('aria-expanded') === 'true';
      mobileHamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileNavDropdown.classList.toggle('show', !isExpanded);
      mobileNavDropdown.setAttribute('aria-hidden', String(isExpanded));
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileHamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNavDropdown.classList.remove('show');
        mobileNavDropdown.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. PLATFORM MODAL & WORKSPACE NAVIGATION
  // ---------------------------------------------------------------------------
  const platformModal = document.getElementById('platform-modal');
  const btnClosePlatform = document.getElementById('btn-close-platform');
  const heroGetStartedBtn = document.getElementById('hero-get-started-btn');
  const aboutLearnMoreBtn = document.getElementById('about-learn-more-btn');
  const openPlatformBtns = document.querySelectorAll('.open-platform-btn');
  const openKpiBtns = document.querySelectorAll('.open-kpi-btn');
  const openReportsBtns = document.querySelectorAll('.open-reports-btn');

  const openPlatform = (tabId = 'tab-dashboard') => {
    platformModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    switchTab(tabId);
    setTimeout(() => {
      resizeAllCharts();
      if (window.lucide) lucide.createIcons();
    }, 150);
  };

  const closePlatform = () => {
    platformModal.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (heroGetStartedBtn) heroGetStartedBtn.addEventListener('click', () => openPlatform('tab-dashboard'));
  if (aboutLearnMoreBtn) aboutLearnMoreBtn.addEventListener('click', () => openPlatform('tab-upload'));
  openPlatformBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openPlatform('tab-dashboard'); }));
  openKpiBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openPlatform('tab-kpis'); }));
  openReportsBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openPlatform('tab-reports'); }));
  if (btnClosePlatform) btnClosePlatform.addEventListener('click', closePlatform);

  // Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.platform-tab-pane');

  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      const isTarget = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isTarget);
    });

    tabPanes.forEach(pane => {
      const isTarget = pane.id === tabId;
      pane.classList.toggle('active', isTarget);
    });

    if (window.lucide) lucide.createIcons();
    resizeAllCharts();
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CHART.JS INITIALIZATION (Uploaded Components Integrated)
  // ---------------------------------------------------------------------------
  let currentDataset = SAMPLE_BENCHMARKS.retail;

  // Chart 1: Monthly Revenue Line Chart (Dark Card with 6M/12M Range)
  const revenueLineChartCanvas = document.getElementById('revenue-line-chart');
  let revenueLineChart = null;

  if (revenueLineChartCanvas) {
    const chartCanvasContext = revenueLineChartCanvas.getContext('2d');
    const revenueFillGradient = chartCanvasContext.createLinearGradient(0, 0, 0, 256);
    revenueFillGradient.addColorStop(0, 'rgba(129, 140, 248, 0.3)');
    revenueFillGradient.addColorStop(1, 'rgba(129, 140, 248, 0)');

    revenueLineChart = new Chart(revenueLineChartCanvas, {
      type: 'line',
      data: {
        labels: currentDataset.monthlyRevenue['6m'].labels,
        datasets: [
          {
            label: 'Revenue',
            data: currentDataset.monthlyRevenue['6m'].values,
            borderColor: '#818cf8',
            backgroundColor: revenueFillGradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#818cf8',
            pointHoverBorderColor: '#111827',
            pointHoverBorderWidth: 2,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `$${tooltipItem.formattedValue}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: {
              color: '#9ca3af',
              callback: (tickValue) => `$${Number(tickValue) / 1000}k`,
            },
          },
        },
      },
    });

    const revenueRangeButtons = document.querySelectorAll('[data-revenue-range]');
    revenueRangeButtons.forEach((revenueRangeButton) => {
      revenueRangeButton.addEventListener('click', () => {
        const selectedRange = revenueRangeButton.dataset.revenueRange;

        revenueRangeButtons.forEach((otherRangeButton) => {
          const isSelectedButton = otherRangeButton === revenueRangeButton;
          otherRangeButton.setAttribute('aria-pressed', String(isSelectedButton));
          otherRangeButton.classList.toggle('active', isSelectedButton);
        });

        revenueLineChart.data.labels = currentDataset.monthlyRevenue[selectedRange].labels;
        revenueLineChart.data.datasets[0].data = currentDataset.monthlyRevenue[selectedRange].values;
        revenueLineChart.update();
      });
    });
  }

  // Chart 2: Revenue vs target (Light Mode Combo Chart)
  const revenueTargetComboChartCanvas = document.getElementById('revenue-target-combo-chart');
  let revenueTargetComboChart = null;

  if (revenueTargetComboChartCanvas) {
    revenueTargetComboChart = new Chart(revenueTargetComboChartCanvas, {
      type: 'bar',
      data: {
        labels: currentDataset.monthlyRevenue['6m'].labels,
        datasets: [
          {
            type: 'bar',
            label: 'Revenue',
            data: currentDataset.monthlyRevenue['6m'].values,
            backgroundColor: '#4f46e5',
            hoverBackgroundColor: '#4338ca',
            borderRadius: 4,
            maxBarThickness: 32,
            order: 2,
          },
          {
            type: 'line',
            label: 'Target',
            data: currentDataset.targets,
            borderColor: '#f59e0b',
            backgroundColor: '#f59e0b',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#f59e0b',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2,
            tension: 0,
            fill: false,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#4b5563' },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#4b5563' },
          },
          y: {
            beginAtZero: true,
            grid: { color: '#e5e7eb' },
            ticks: {
              color: '#4b5563',
              callback: (tickValue) => `$${Number(tickValue) / 1000}k`,
            },
          },
        },
      },
    });
  }

  // Chart 3: Revenue vs target (Dark Mode Combo Chart)
  const revenueTargetComboChartDarkCanvas = document.getElementById('revenue-target-combo-chart-dark');
  let revenueTargetComboChartDark = null;

  if (revenueTargetComboChartDarkCanvas) {
    revenueTargetComboChartDark = new Chart(revenueTargetComboChartDarkCanvas, {
      type: 'bar',
      data: {
        labels: currentDataset.monthlyRevenue['6m'].labels,
        datasets: [
          {
            type: 'bar',
            label: 'Revenue',
            data: currentDataset.monthlyRevenue['6m'].values,
            backgroundColor: '#818cf8',
            hoverBackgroundColor: '#a5b4fc',
            borderRadius: 4,
            maxBarThickness: 32,
            order: 2,
          },
          {
            type: 'line',
            label: 'Target',
            data: currentDataset.targets,
            borderColor: '#fbbf24',
            backgroundColor: '#fbbf24',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fbbf24',
            pointHoverBorderColor: '#111827',
            pointHoverBorderWidth: 2,
            tension: 0,
            fill: false,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#9ca3af' },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: {
              color: '#9ca3af',
              callback: (tickValue) => `$${Number(tickValue) / 1000}k`,
            },
          },
        },
      },
    });
  }

  // Chart 4: Revenue: This Year vs Last Year (Dark Line Chart)
  const yearlyRevenueComparisonLineChartCanvas = document.getElementById('yearly-revenue-comparison-line-chart');
  let yearlyRevenueComparisonLineChart = null;

  if (yearlyRevenueComparisonLineChartCanvas) {
    yearlyRevenueComparisonLineChart = new Chart(yearlyRevenueComparisonLineChartCanvas, {
      type: 'line',
      data: {
        labels: currentDataset.monthlyRevenue['6m'].labels,
        datasets: [
          {
            label: 'This year',
            data: currentDataset.monthlyRevenue['6m'].values,
            borderColor: '#818cf8',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#818cf8',
            pointHoverBorderColor: '#111827',
            pointHoverBorderWidth: 2,
            tension: 0.35,
            fill: false,
          },
          {
            label: 'Last year',
            data: currentDataset.lastYear,
            borderColor: '#9ca3af',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#9ca3af',
            pointHoverBorderColor: '#111827',
            pointHoverBorderWidth: 2,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#9ca3af' },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: {
              color: '#9ca3af',
              callback: (tickValue) => `$${Number(tickValue) / 1000}k`,
            },
          },
        },
      },
    });
  }

  // Secondary Charts (Category Donut + Regional Bar)
  const categoryChartCanvas = document.getElementById('category-doughnut-chart');
  let categoryChart = null;
  if (categoryChartCanvas) {
    categoryChart = new Chart(categoryChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Furniture', 'Software', 'Accessories', 'Services'],
        datasets: [{
          data: [42, 22, 18, 12, 6],
          backgroundColor: ['#15BCDF', '#818cf8', '#34d399', '#f59e0b', '#ec4899'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#9ca3af', boxWidth: 12 } }
        }
      }
    });
  }

  const regionalChartCanvas = document.getElementById('regional-bar-chart');
  let regionalChart = null;
  if (regionalChartCanvas) {
    regionalChart = new Chart(regionalChartCanvas, {
      type: 'bar',
      data: {
        labels: ['North Zone', 'West Zone', 'South Zone', 'East Zone'],
        datasets: [{
          label: 'Revenue ($)',
          data: [18400, 14200, 9600, 5800],
          backgroundColor: '#15BCDF',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#9ca3af' }, grid: { display: false } },
          y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.06)' } }
        }
      }
    });
  }

  function resizeAllCharts() {
    [revenueLineChart, revenueTargetComboChart, revenueTargetComboChartDark, yearlyRevenueComparisonLineChart, categoryChart, regionalChart].forEach(c => {
      if (c) c.resize();
    });
  }

  window.addEventListener('resize', resizeAllCharts);

  // ---------------------------------------------------------------------------
  // 5. DATASET SWITCHER & CLEANING ENGINE
  // ---------------------------------------------------------------------------
  const datasetQuickSelect = document.getElementById('dataset-quick-select');
  const cleaningDatasetName = document.getElementById('cleaning-dataset-name');
  const statTotalRows = document.getElementById('stat-total-rows');
  const statDuplicatesRemoved = document.getElementById('stat-duplicates-removed');
  const statDatesStandardized = document.getElementById('stat-dates-standardized');
  const statOutliersFlagged = document.getElementById('stat-outliers-flagged');
  const cleanedPreviewTbody = document.getElementById('cleaned-preview-tbody');

  function renderCleanedTable(rows) {
    if (!cleanedPreviewTbody) return;
    cleanedPreviewTbody.innerHTML = '';
    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><code>${r.row_id}</code></td>
        <td>${r.invoice_date}</td>
        <td><strong>${r.product_name}</strong></td>
        <td><span class="status-badge green">${r.category}</span></td>
        <td>${r.region}</td>
        <td>${r.quantity}</td>
        <td>${r.unit_price}</td>
        <td><strong>${r.total_amount}</strong></td>
        <td><span class="text-cyan">${r.cleaning_flag}</span></td>
      `;
      cleanedPreviewTbody.appendChild(tr);
    });
  }

  function applyDataset(key) {
    const data = SAMPLE_BENCHMARKS[key];
    if (!data) return;
    currentDataset = data;

    // Update Top KPIs
    document.getElementById('kpi-display-revenue').textContent = data.kpis.revenue;
    document.getElementById('kpi-display-margin').textContent = data.kpis.margin;
    document.getElementById('kpi-display-cac').textContent = data.kpis.cac;
    document.getElementById('kpi-display-return').textContent = data.kpis.returnRate;

    // Update Cleaning Stats
    if (cleaningDatasetName) cleaningDatasetName.textContent = data.datasetName;
    if (statTotalRows) statTotalRows.textContent = data.totalRows.toLocaleString();
    if (statDuplicatesRemoved) statDuplicatesRemoved.textContent = data.duplicatesRemoved;
    if (statDatesStandardized) statDatesStandardized.textContent = data.datesStandardized;
    if (statOutliersFlagged) statOutliersFlagged.textContent = data.outliersFlagged;

    renderCleanedTable(data.cleanedRows);

    // Update Charts
    if (revenueLineChart) {
      revenueLineChart.data.labels = data.monthlyRevenue['6m'].labels;
      revenueLineChart.data.datasets[0].data = data.monthlyRevenue['6m'].values;
      revenueLineChart.update();
    }
    if (revenueTargetComboChart) {
      revenueTargetComboChart.data.labels = data.monthlyRevenue['6m'].labels;
      revenueTargetComboChart.data.datasets[0].data = data.monthlyRevenue['6m'].values;
      revenueTargetComboChart.data.datasets[1].data = data.targets;
      revenueTargetComboChart.update();
    }
    if (revenueTargetComboChartDark) {
      revenueTargetComboChartDark.data.labels = data.monthlyRevenue['6m'].labels;
      revenueTargetComboChartDark.data.datasets[0].data = data.monthlyRevenue['6m'].values;
      revenueTargetComboChartDark.data.datasets[1].data = data.targets;
      revenueTargetComboChartDark.update();
    }
    if (yearlyRevenueComparisonLineChart) {
      yearlyRevenueComparisonLineChart.data.labels = data.monthlyRevenue['6m'].labels;
      yearlyRevenueComparisonLineChart.data.datasets[0].data = data.monthlyRevenue['6m'].values;
      yearlyRevenueComparisonLineChart.data.datasets[1].data = data.lastYear;
      yearlyRevenueComparisonLineChart.update();
    }

    if (datasetQuickSelect && datasetQuickSelect.value !== key) {
      datasetQuickSelect.value = key;
    }
  }

  // Initialize with Retail dataset
  applyDataset('retail');

  if (datasetQuickSelect) {
    datasetQuickSelect.addEventListener('change', (e) => {
      applyDataset(e.target.value);
      showToast(`Switched active dataset to ${SAMPLE_BENCHMARKS[e.target.value].datasetName}`, 'success');
    });
  }

  // Sample Buttons in Tab 2
  document.querySelectorAll('.btn-sample-dataset').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.dataset.sample;
      applyDataset(sampleKey);
      showToast(`Cleaned & loaded ${SAMPLE_BENCHMARKS[sampleKey].datasetName} (100% Schema Validated)`, 'success');
    });
  });

  // Drag & Drop File Ingestion Simulation
  const dropZone = document.getElementById('file-drop-zone');
  const fileUploadInput = document.getElementById('file-upload-input');
  const btnBrowseFile = document.getElementById('btn-browse-file');

  if (btnBrowseFile && fileUploadInput) {
    btnBrowseFile.addEventListener('click', () => fileUploadInput.click());
  }

  if (fileUploadInput) {
    fileUploadInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
  }

  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  function handleFileUpload(file) {
    showToast(`Ingesting raw file: ${file.name}...`, 'alert');
    setTimeout(() => {
      applyDataset('retail');
      if (cleaningDatasetName) cleaningDatasetName.textContent = file.name;
      showToast(`Automated Pandas pipeline finished: 132 duplicates removed, 48 dates fixed, 12 outliers flagged!`, 'success');
    }, 900);
  }

  const btnSyncToSql = document.getElementById('btn-sync-to-sql');
  if (btnSyncToSql) {
    btnSyncToSql.addEventListener('click', () => {
      showToast('Successfully committed 1,116 cleaned rows to PostgreSQL public.sales_fact!', 'success');
    });
  }

  // ---------------------------------------------------------------------------
  // 6. KPI TRACKER & ALERTS ENGINE
  // ---------------------------------------------------------------------------
  const kpiDefinitionsTbody = document.getElementById('kpi-definitions-tbody');
  const alertsStreamContainer = document.getElementById('alerts-stream-container');
  const alertsCountBadge = document.getElementById('alerts-count-badge');
  const activeAlertPill = document.getElementById('active-alert-pill');
  const btnSimulateAlert = document.getElementById('btn-simulate-alert');
  const toggleAlertsBtn = document.getElementById('toggle-alerts-btn');

  let activeAlertsList = [...INITIAL_ALERTS];

  function renderKpiTable() {
    if (!kpiDefinitionsTbody) return;
    kpiDefinitionsTbody.innerHTML = '';
    KPI_DEFINITIONS.forEach(k => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${k.name}</strong></td>
        <td>${k.target}</td>
        <td><strong>${k.actual}</strong></td>
        <td><span class="${k.status === 'green' ? 'text-green' : 'text-amber'}">${k.variance}</span></td>
        <td><code>${k.warning}</code></td>
        <td><code>${k.critical}</code></td>
        <td><span class="status-badge ${k.status}">${k.status.toUpperCase()}</span></td>
        <td><button class="btn-alert-ack" onclick="alert('Threshold editor for ${k.name}')">Edit</button></td>
      `;
      kpiDefinitionsTbody.appendChild(tr);
    });
  }

  function renderAlerts() {
    if (!alertsStreamContainer) return;
    alertsStreamContainer.innerHTML = '';
    activeAlertsList.forEach(a => {
      const card = document.createElement('div');
      card.className = `alert-item-card ${a.severity}`;
      card.innerHTML = `
        <div class="alert-item-top">
          <span class="alert-item-title">${a.title}</span>
          <span class="alert-time">${a.time}</span>
        </div>
        <p class="alert-msg">${a.message}</p>
        <div class="alert-actions">
          <button type="button" class="btn-alert-ack" data-id="${a.id}" data-action="ack">Acknowledge</button>
          <button type="button" class="btn-alert-ack" data-id="${a.id}" data-action="resolve">Resolve</button>
        </div>
      `;
      alertsStreamContainer.appendChild(card);
    });

    const unresolvedCount = activeAlertsList.length;
    if (alertsCountBadge) alertsCountBadge.textContent = unresolvedCount;
    if (activeAlertPill) activeAlertPill.textContent = `${unresolvedCount} Active`;

    // Attach actions
    alertsStreamContainer.querySelectorAll('.btn-alert-ack').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const action = e.target.dataset.action;
        activeAlertsList = activeAlertsList.filter(x => x.id !== id);
        renderAlerts();
        showToast(`Alert #${id} marked as ${action === 'resolve' ? 'Resolved' : 'Acknowledged'}`, 'success');
      });
    });
  }

  renderKpiTable();
  renderAlerts();

  if (btnSimulateAlert) {
    btnSimulateAlert.addEventListener('click', () => {
      const newAlert = {
        id: `alt-${Math.floor(Math.random() * 900 + 100)}`,
        severity: "warning",
        title: "CRITICAL: Margin Dip in West Zone (32.1%)",
        message: "Automated trigger: Gross margin in West distribution channel dropped below 35% minimum safe threshold.",
        time: "Just now",
        status: "Unresolved"
      };
      activeAlertsList.unshift(newAlert);
      renderAlerts();
      showToast("🚨 Alert Triggered: Margin Breach in West Zone!", "alert");
    });
  }

  if (toggleAlertsBtn) {
    toggleAlertsBtn.addEventListener('click', () => {
      switchTab('tab-kpis');
    });
  }

  const btnAddKpiModal = document.getElementById('btn-add-kpi-modal');
  if (btnAddKpiModal) {
    btnAddKpiModal.addEventListener('click', () => {
      showToast('KPI Builder: Enter metric formula (e.g. SUM(revenue) / COUNT(orders))', 'success');
    });
  }

  // ---------------------------------------------------------------------------
  // 7. AI BUSINESS SUMMARY GENERATOR
  // ---------------------------------------------------------------------------
  const btnGenerateAiSummary = document.getElementById('btn-generate-ai-summary');
  const quickAiBtn = document.getElementById('quick-ai-btn');
  const btnCopyAiSummary = document.getElementById('btn-copy-ai-summary');
  const aiNlqInput = document.getElementById('ai-nlq-input');
  const btnAskSubmit = document.getElementById('btn-ask-submit');
  const aiNlqResponse = document.getElementById('ai-nlq-response');
  const aiSummaryTextBox = document.getElementById('ai-summary-text-box');

  if (quickAiBtn) {
    quickAiBtn.addEventListener('click', () => {
      switchTab('tab-ai');
    });
  }

  if (btnGenerateAiSummary) {
    btnGenerateAiSummary.addEventListener('click', () => {
      showToast('AI Synthesizer: Querying Postgres fact tables...', 'alert');
      if (aiSummaryTextBox) {
        aiSummaryTextBox.style.opacity = '0.5';
        setTimeout(() => {
          aiSummaryTextBox.style.opacity = '1';
          showToast('Fresh Executive AI Brief synthesized successfully!', 'success');
        }, 600);
      }
    });
  }

  if (btnCopyAiSummary) {
    btnCopyAiSummary.addEventListener('click', () => {
      navigator.clipboard.writeText(aiSummaryTextBox.innerText || '').then(() => {
        showToast('Executive brief copied to clipboard!', 'success');
      });
    });
  }

  if (btnAskSubmit && aiNlqInput) {
    const handleNLQ = () => {
      const q = aiNlqInput.value.trim();
      if (!q) return;
      aiNlqResponse.style.display = 'block';
      aiNlqResponse.innerHTML = `<em>Translating "${q}" to SQL & computing aggregate...</em>`;
      setTimeout(() => {
        aiNlqResponse.innerHTML = `
          <strong class="text-cyan"><i data-lucide="check"></i> SQL Generated:</strong>
          <pre style="background:#111827; padding:8px; border-radius:4px; margin:6px 0; font-family:monospace; color:#38bdf8;">SELECT region, AVG(gross_margin) FROM sales_fact GROUP BY region ORDER BY 2 ASC LIMIT 1;</pre>
          <div><strong>Insight:</strong> The <strong>East Zone</strong> had the sharpest gross margin variance (-3.2% vs target) due to packaging freight costs.</div>
        `;
        if (window.lucide) lucide.createIcons();
      }, 700);
    };

    btnAskSubmit.addEventListener('click', handleNLQ);
    aiNlqInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleNLQ(); });
  }

  // ---------------------------------------------------------------------------
  // 8. AUTOMATED SCHEDULED REPORTS & EMAIL PREVIEWS
  // ---------------------------------------------------------------------------
  const emailMockupContainer = document.getElementById('email-mockup-container');
  const btnDownloadPdfPreview = document.getElementById('btn-download-pdf-preview');

  const reportTemplatesHtml = {
    daily: `
      <div class="email-header-bar">
        <span class="email-brand-title">TARGO SMART MIS • DAILY FLASH</span>
        <span class="email-date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
      </div>
      <h3 style="color:#0f172a; margin-bottom:8px;">☀️ Morning Sales & Revenue Flash Digest</h3>
      <p style="font-size:13px; color:#475569; margin-bottom:16px;">Automated distribution to Executive Committee & Finance Ops.</p>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px;">
          <div style="font-size:11px; color:#64748b;">DAILY GROSS REVENUE</div>
          <div style="font-size:20px; font-weight:700; color:#0f172a;">$14,820.00</div>
          <div style="font-size:11px; color:#10b981;">+18.4% above daily target</div>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px;">
          <div style="font-size:11px; color:#64748b;">ORDERS FULFILLED</div>
          <div style="font-size:20px; font-weight:700; color:#0f172a;">342 Units</div>
          <div style="font-size:11px; color:#3b82f6;">99.2% on-time dispatch</div>
        </div>
      </div>

      <div style="background:#eff6ff; border-left:4px solid #3b82f6; padding:12px; border-radius:4px; font-size:12px; color:#1e3a8a; margin-bottom:16px;">
        <strong>AI Insight:</strong> Electronics SKUs accounted for 54% of daily volume. High inventory clearance in North Hub.
      </div>
      <p style="font-size:11px; color:#94a3b8;">Generated automatically by Targo APScheduler Engine. Timezone: IST.</p>
    `,

    weekly: `
      <div class="email-header-bar">
        <span class="email-brand-title">TARGO SMART MIS • WEEKLY EXECUTIVE DECK</span>
        <span class="email-date">Week 24 • June 2026</span>
      </div>
      <h3 style="color:#0f172a; margin-bottom:8px;">📊 Executive Business Summary & KPI Scorecard</h3>
      <p style="font-size:13px; color:#475569; margin-bottom:16px;">Comprehensive 7-day variance report and risk alerts.</p>
      
      <table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:16px;">
        <tr style="background:#f1f5f9;"><th style="padding:8px; text-align:left;">Metric</th><th style="padding:8px; text-align:left;">Weekly Actual</th><th style="padding:8px; text-align:left;">Target</th><th style="padding:8px; text-align:left;">Status</th></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #e2e8f0;">Gross Revenue</td><td style="padding:8px; border-bottom:1px solid #e2e8f0;"><strong>$48,000</strong></td><td style="padding:8px; border-bottom:1px solid #e2e8f0;">$40,000</td><td style="padding:8px; border-bottom:1px solid #e2e8f0; color:#10b981;">+20.0% (Passed)</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #e2e8f0;">Gross Margin</td><td style="padding:8px; border-bottom:1px solid #e2e8f0;"><strong>41.8%</strong></td><td style="padding:8px; border-bottom:1px solid #e2e8f0;">38.0%</td><td style="padding:8px; border-bottom:1px solid #e2e8f0; color:#10b981;">+3.8% (Passed)</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #e2e8f0;">Return Rate</td><td style="padding:8px; border-bottom:1px solid #e2e8f0;"><strong>4.8%</strong></td><td style="padding:8px; border-bottom:1px solid #e2e8f0;">4.0%</td><td style="padding:8px; border-bottom:1px solid #e2e8f0; color:#f59e0b;">ALERT (Over Limit)</td></tr>
      </table>

      <div style="background:#fffbeb; border-left:4px solid #f59e0b; padding:12px; border-radius:4px; font-size:12px; color:#92400e; margin-bottom:16px;">
        <strong>Action Item for Supply Chain:</strong> Packaging QA audit recommended for East Zone distributor hub to reduce 4.8% return rate.
      </div>
      <p style="font-size:11px; color:#94a3b8;">Includes attached Power BI Snapshot Deck (PDF).</p>
    `,

    monthly: `
      <div class="email-header-bar">
        <span class="email-brand-title">TARGO SMART MIS • MONTHLY BOARD AUDIT</span>
        <span class="email-date">Close of June 2026</span>
      </div>
      <h3 style="color:#0f172a; margin-bottom:8px;">📈 Monthly Financial Audit & YoY Review</h3>
      <p style="font-size:13px; color:#475569; margin-bottom:16px;">For Board of Directors, Managing Partners, and Investors.</p>
      
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:6px; margin-bottom:16px;">
        <h4 style="margin-bottom:8px; color:#0f172a;">Key Monthly Milestones:</h4>
        <ul style="padding-left:20px; font-size:12px; color:#334155; line-height:1.6;">
          <li>Monthly revenue reached record <strong>$48,000</strong> (+14.3% MoM expansion).</li>
          <li>Trailing 6-month aggregate stands at <strong>$222,000</strong> (+33.7% YoY).</li>
          <li>Cash collection efficiency at <strong>94.2%</strong>.</li>
        </ul>
      </div>
      <p style="font-size:11px; color:#94a3b8;">Full 12-page financial model PDF attached to this email.</p>
    `
  };

  function setReportPreview(type) {
    if (emailMockupContainer && reportTemplatesHtml[type]) {
      emailMockupContainer.innerHTML = reportTemplatesHtml[type];
    }
  }

  setReportPreview('daily');

  document.querySelectorAll('.btn-report-preview').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.reportType;
      setReportPreview(type);
      showToast(`Showing preview for ${type.toUpperCase()} report template.`, 'success');
    });
  });

  document.querySelectorAll('.btn-report-send').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.reportType;
      showToast(`Dispatching ${type.toUpperCase()} test email via SMTP to 4 recipients...`, 'alert');
      setTimeout(() => {
        showToast(`Email delivered successfully with PDF attachment!`, 'success');
      }, 800);
    });
  });

  if (btnDownloadPdfPreview) {
    btnDownloadPdfPreview.addEventListener('click', () => {
      window.print();
    });
  }

  // ---------------------------------------------------------------------------
  // 9. SQL EXPLORER & QUERY SANDBOX
  // ---------------------------------------------------------------------------
  const sampleSqlSelect = document.getElementById('sample-sql-select');
  const sqlQueryInput = document.getElementById('sql-query-input');
  const btnRunSql = document.getElementById('btn-run-sql');
  const sqlResultsTbody = document.getElementById('sql-results-tbody');
  const sqlRowsCount = document.getElementById('sql-rows-count');

  if (sampleSqlSelect && sqlQueryInput) {
    sampleSqlSelect.addEventListener('change', (e) => {
      const queryKey = e.target.value;
      if (PREBUILT_SQL_QUERIES[queryKey]) {
        sqlQueryInput.value = PREBUILT_SQL_QUERIES[queryKey];
      }
    });
  }

  function executeSqlQuery() {
    if (!sqlResultsTbody) return;
    sqlResultsTbody.innerHTML = '';

    const results = [
      { month_label: "Jun 2026", total_orders: 342, total_units: 1480, rev: "$48,000.00", margin: "41.8%" },
      { month_label: "May 2026", total_orders: 298, total_units: 1240, rev: "$42,000.00", margin: "40.5%" },
      { month_label: "Apr 2026", total_orders: 275, total_units: 1150, rev: "$39,000.00", margin: "39.8%" },
      { month_label: "Mar 2026", total_orders: 230, total_units: 980, rev: "$31,000.00", margin: "38.2%" },
      { month_label: "Feb 2026", total_orders: 250, total_units: 1040, rev: "$34,000.00", margin: "38.9%" },
      { month_label: "Jan 2026", total_orders: 210, total_units: 890, rev: "$28,000.00", margin: "37.5%" }
    ];

    results.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${r.month_label}</strong></td>
        <td>${r.total_orders}</td>
        <td>${r.total_units}</td>
        <td><strong class="text-cyan">${r.rev}</strong></td>
        <td><span class="text-green">${r.margin}</span></td>
      `;
      sqlResultsTbody.appendChild(tr);
    });

    if (sqlRowsCount) sqlRowsCount.textContent = `${results.length} rows returned in 12ms`;
    showToast('SQL Query executed against Postgres fact table (Index Scan: 12ms)', 'success');
  }

  if (btnRunSql) {
    btnRunSql.addEventListener('click', executeSqlQuery);
  }

  // Run on load
  executeSqlQuery();

  // ---------------------------------------------------------------------------
  // 10. ROLE SWITCHER CONTROLLER
  // ---------------------------------------------------------------------------
  const userRoleSelect = document.getElementById('user-role-select');
  const currentRoleTag = document.getElementById('current-role-tag');

  if (userRoleSelect && currentRoleTag) {
    userRoleSelect.addEventListener('change', (e) => {
      const role = e.target.value;
      currentRoleTag.textContent = role.toUpperCase();
      showToast(`Switched user role to ${role}. Permissions updated.`, 'success');
    });
  }

  // ---------------------------------------------------------------------------
  // 11. CONTACT MODAL & FORM
  // ---------------------------------------------------------------------------
  const contactModal = document.getElementById('contact-modal');
  const contactHeaderBtn = document.getElementById('contact-header-btn');
  const mobileContactTrigger = document.getElementById('mobile-contact-trigger');
  const btnCloseContact = document.getElementById('btn-close-contact');
  const contactForm = document.getElementById('contact-form');

  const openContact = () => {
    contactModal.style.display = 'flex';
  };
  const closeContact = () => {
    contactModal.style.display = 'none';
  };

  if (contactHeaderBtn) contactHeaderBtn.addEventListener('click', openContact);
  if (mobileContactTrigger) mobileContactTrigger.addEventListener('click', openContact);
  if (btnCloseContact) btnCloseContact.addEventListener('click', closeContact);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeContact();
      showToast('Thank you! Our systems engineer will contact you with a customized MIS demo.', 'success');
      contactForm.reset();
    });
  }

  // Export Dashboard CSV Action
  const btnExportDashboardCsv = document.getElementById('btn-export-dashboard-csv');
  if (btnExportDashboardCsv) {
    btnExportDashboardCsv.addEventListener('click', () => {
      const csvContent = "data:text/csv;charset=utf-8,Month,Revenue,Target,LastYear\nJan,28000,32000,22000\nFeb,34000,32000,25000\nMar,31000,32000,24000\nApr,39000,40000,29000\nMay,42000,40000,31000\nJun,48000,40000,35000";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "targo_smart_mis_revenue_fact.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Exported targo_smart_mis_revenue_fact.csv", "success");
    });
  }

  const btnPrintReport = document.getElementById('btn-print-report');
  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      window.print();
    });
  }

  // ---------------------------------------------------------------------------
  // 12. TOAST NOTIFICATION UTILITY
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle-2' : type === 'alert' ? 'alert-circle' : 'info'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  window.showToast = showToast;
});
