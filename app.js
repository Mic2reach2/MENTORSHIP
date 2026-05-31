// Business Mentor - Professional Business Mentorship Platform
document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('mm_currentUser') || 'null');
    let currentRole = currentUser?.role || 'mentee';

    const demoData = {
        name: 'Alex Johnson',
        email: 'alex.johnson@company.com',
        industry: 'Technology',
        level: 'Entry',
        mentor: 'Sarah Chen',
        ...(currentUser || {})
    };

    const demoGoals = [
        { id: 1, title: 'Complete Q2 Performance Review', progress: 75, due: '2024-06-30' },
        { id: 2, title: 'Lead Team Project Successfully', progress: 45, due: '2024-07-15' }
    ];

    const demoSessions = [
        { id: 1, title: 'Leadership Excellence Workshop', type: 'group', capacity: 15, enrolled: 12, date: '2024-06-15', time: '10:00 AM', status: 'scheduled' },
        { id: 2, title: '1:1 Career Strategy Session', type: 'private', capacity: 1, enrolled: 0, date: '2024-06-16', time: '2:30 PM', status: 'available' }
    ];

    const demoResources = [
        { title: 'Executive Leadership Handbook', author: 'Dr. James Miller', date: '2024-05-01' },
        { title: 'Industry Trend Analysis 2024', author: 'Business Insights', date: '2024-05-15' }
    ];

    const demoCertificates = [
        { title: 'Leadership Foundations Certificate', date: '2024-04-15', status: 'verified' },
        { title: 'Communication Skills Badge', date: '2024-05-20', status: 'pending' }
    ];

    const demoRecordings = [
        { title: 'Leadership Skills Workshop', date: '2024-05-15', duration: '58 min' },
        { title: 'Career Planning Session', date: '2024-05-22', duration: '15 min' }
    ];

    init();

    function init() {
        updateHeader();
        renderOverview();
        renderResources();
        renderCertificates();
        renderRecordings();
        renderSessions();
        renderAnalytics();
        renderUsers();
        renderSafeguarding();
    }

    function updateHeader() {
        document.getElementById('headerName').textContent = demoData.name?.split(' ')[0] || 'Guest';
        document.getElementById('headerAvatar').textContent = demoData.name?.[0] || '?';
        document.getElementById('pageTitle').textContent = `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard`;
        document.getElementById('pageDesc').textContent = getRoleDescription();
    }

    function getRoleDescription() {
        const desc = {
            mentee: 'Manage your professional development journey.',
            mentor: 'Guide mentees and track mentoring progress.',
            admin: 'Oversee the mentoring program and manage users.',
            wellbeing: 'Monitor wellbeing and provide support.',
            supervisor: 'Oversee safety protocols and review reports.'
        };
        return desc[currentRole] || desc.mentee;
    }

    window.switchTab = function(tab) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`panel-${tab}`).classList.add('active');
    };

    window.switchRole = function(role) {
        currentRole = role;
        if (currentUser) {
            currentUser.role = role;
            localStorage.setItem('mm_currentUser', JSON.stringify(currentUser));
        }
        init();
    };

    window.openProfileModal = function() {
        const modal = document.getElementById('profileModal');
        modal.classList.add('active');
        document.getElementById('profileName').value = demoData.name;
        document.getElementById('profileEmail').value = demoData.email;
    };

    window.closeProfileModal = function() {
        document.getElementById('profileModal').classList.remove('active');
    };

    window.previewAvatar = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('avatarPreview');
                preview.style.backgroundImage = `url(${e.target.result})`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
                preview.textContent = '';
            };
            reader.readAsDataURL(file);
        }
    };

    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        demoData.name = document.getElementById('profileName').value;
        demoData.email = document.getElementById('profileEmail').value;
        localStorage.setItem('mm_currentUser', JSON.stringify(demoData));
        closeProfileModal();
        updateHeader();
        alert('Profile updated!');
    });

    window.toggleUserMenu = function() {
        const menu = document.getElementById('userMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    window.toggleMobileMenu = function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('mobile-open');
    };

    window.submitSafeguardingReport = function() {
        const text = document.getElementById('safeguardingText').value.trim();
        if (!text) return alert("Please describe the concern.");
        alert("Report submitted. DSL has been notified.");
        document.getElementById('safeguardingText').value = '';
    };

    function renderOverview() {
        const grid = document.getElementById('overviewGrid');
        const stats = currentRole === 'mentee' ? ['8', '3 Active', '12'] : ['24', '12', '48'];
        
        grid.innerHTML = `
            <div class="content-card profile-card">
                <div class="card-title"><i class="fa-solid fa-user"></i> My Profile</div>
                <div class="profile-head">
                    <div class="profile-avatar">${demoData.name[0]}</div>
                    <div>
                        <strong>${demoData.name}</strong>
                        <span>${demoData.industry} • ${demoData.level} level</span>
                        ${demoData.mentor ? `<span>Mentor: ${demoData.mentor}</span>` : ''}
                    </div>
                </div>
                <div class="profile-stats">
                    <div><span>Sessions</span><strong>${stats[0]}</strong></div>
                    <div><span>Goals</span><strong>${stats[1]}</strong></div>
                    <div><span>Hours</span><strong>${stats[2]}</strong></div>
                </div>
                <button class="btn btn-primary" onclick="openProfileModal()"><i class="fa-solid fa-pen"></i> Edit Profile</button>
            </div>
            <div class="content-card">
                <div class="card-title"><i class="fa-solid fa-target"></i> Development Goals</div>
                ${demoGoals.map(g => `
                    <div class="goal-item">
                        <div class="goal-header">
                            <strong>${g.title}</strong>
                            <span>${g.progress}%</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${g.progress}%"></div></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderResources() {
        const list = document.getElementById('resourcesList');
        list.innerHTML = demoResources.map(r => `
            <div class="list-item">
                <div>
                    <strong>${r.title}</strong>
                    <span>${r.author} • ${r.date}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i></button>
                    <button class="btn btn-secondary btn-sm" onclick="approveResource('${r.title}')"><i class="fa-solid fa-check"></i> Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteResource('${r.title}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    window.uploadResource = function() {
        document.getElementById('resourceFile').click();
    };

    window.handleResourceUpload = function(event) {
        const file = event.target.files[0];
        if (file) {
            demoResources.push({
                title: file.name,
                author: 'Uploaded by Admin',
                date: new Date().toISOString().split('T')[0]
            });
            renderResources();
            alert(`Resource uploaded: ${file.name}`);
        }
    };

    window.approveResource = function(title) { alert(`Approved: ${title}`); };
    window.deleteResource = function(title) { alert(`Deleted: ${title}`); };

    window.generateCertificate = function() {
        const name = prompt('Recipient Name:');
        const program = prompt('Program/Course:');
        if (name && program) {
            demoCertificates.push({
                title: `${program} Certificate`,
                date: new Date().toISOString().split('T')[0],
                status: 'pending'
            });
            renderCertificates();
            alert('Certificate generated!');
        }
    };

    function renderCertificates() {
        const list = document.getElementById('certificatesList');
        list.innerHTML = demoCertificates.map(c => `
            <div class="list-item">
                <div>
                    <strong>${c.title}</strong>
                    <span>Issued: ${c.date} • ${c.status}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-${c.status === 'verified' ? 'success' : 'primary'} btn-sm">
                        <i class="fa-solid fa-download"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="verifyCertificate('${c.title}')"><i class="fa-solid fa-check"></i> Verify</button>
                </div>
            </div>
        `).join('');
    }

    window.verifyCertificate = function(title) { alert(`Verified: ${title}`); };

    function renderRecordings() {
        const list = document.getElementById('recordingsList');
        list.innerHTML = demoRecordings.map(r => `
            <div class="list-item">
                <div>
                    <strong>${r.title}</strong>
                    <span>${r.date} • ${r.duration} • Audio</span>
                </div>
                <button class="btn btn-primary btn-sm"><i class="fa-solid fa-play"></i></button>
            </div>
        `).join('');
    }

    function renderSessions() {
        const list = document.getElementById('sessionsList');
        
        list.innerHTML = demoSessions.map(s => `
            <tr style="border-bottom: 1px solid var(--color-gray-200);">
                <td style="padding: 8px;"><strong>${s.title}</strong></td>
                <td style="padding: 8px;">${s.type === 'group' ? 'Group (1hr)' : '1:1 (15min)'}</td>
                <td style="padding: 8px;">${s.date} at ${s.time}</td>
                <td style="padding: 8px;"><span class="badge badge-${s.status === 'scheduled' ? 'success' : 'warning'}">${s.enrolled}/${s.capacity} enrolled</span></td>
                <td style="padding: 8px; text-align: center;">
                    <button class="btn btn-${s.status === 'available' ? 'success' : 'primary'} btn-sm" onclick="updateSessionStatus(${s.id})">
                        ${s.status === 'available' ? 'Reserve' : 'View'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    window.openNewSessionModal = function() {
        const title = prompt('Session Title:');
        const date = prompt('Date (YYYY-MM-DD):');
        const time = prompt('Time (e.g., 10:00 AM):');
        if (title && date && time) {
            demoSessions.push({
                id: Date.now(),
                title,
                type: confirm('Group session? OK=Group, Cancel=1:1') ? 'group' : 'private',
                capacity: confirm('Group session?') ? 15 : 1,
                enrolled: 0,
                date,
                time,
                status: 'available'
            });
            renderSessions();
            alert('Session created!');
        }
    };

    window.updateSessionStatus = function(id) {
        const session = demoSessions.find(s => s.id === id);
        if (session) {
            alert(`Session: ${session.title}\nStatus: ${session.status}\nEnrolled: ${session.enrolled}/${session.capacity}`);
        }
    };

    window.addGoal = function() {
        const input = document.getElementById('newGoal');
        const value = input.value.trim();
        if (value) {
            demoGoals.push({ id: Date.now(), title: value, progress: 0 });
            input.value = '';
            renderOverview();
        }
    };

    window.openGroupChat = function() {
        const groupName = prompt('Group name:');
        if (groupName) {
            const msg = document.createElement('div');
            msg.className = 'session-row';
            msg.style.cssText = 'background:var(--color-gray-100);padding:10px 14px;border-radius:8px;margin-bottom:10px;';
            msg.innerHTML = `<strong>System:</strong> Group "${groupName}" created. Invite users to join.`;
            document.getElementById('chatBox').appendChild(msg);
        }
    };

    window.selectConversation = function(name) {
        alert(`Switched to conversation with ${name}`);
    };

    function renderAnalytics() {
        const grid = document.getElementById('analyticsGrid');
        const chart = document.getElementById('sessionChart');
        
        const bars = [65, 40, 85, 55, 75, 50, 90];
        chart.innerHTML = bars.map((h, i) => `
            <div class="bar" style="height:${h}px">
                <span>Day ${i + 1}</span>
            </div>
        `).join('');
    }

    function renderUsers() {
        const list = document.getElementById('usersList');
        const demoUsers = [
            { name: 'Alex Johnson', role: 'mentee', status: 'active', sessions: 8 },
            { name: 'Sarah Chen', role: 'mentor', status: 'active', sessions: 24 },
            { name: 'Michael Rodriguez', role: 'mentee', status: 'pending', sessions: 0 }
        ];
        list.innerHTML = demoUsers.map(u => `
            <div class="list-item">
                <div>
                    <strong>${u.name}</strong>
                    <span>${u.role} • ${u.sessions} sessions</span>
                </div>
                <span class="badge badge-${u.status === 'active' ? 'success' : 'warning'}">${u.status}</span>
            </div>
        `).join('');
    }

    function renderSafeguarding() {
        const list = document.getElementById('dslAuditLogs');
        const logsCard = document.getElementById('dslLogsCard');
        
        // Only show audit logs for admin/supervisor/wellbeing roles
        if (['admin', 'supervisor', 'wellbeing'].includes(currentRole)) {
            logsCard.style.display = 'block';
        } else {
            logsCard.style.display = 'none';
        }
        
        const logs = [
            { type: 'info', text: 'User logged in', time: '2024-06-15 10:30 AM' },
            { type: 'warning', text: 'Message redacted in chat', time: '2024-06-14 2:15 PM' }
        ];
        list.innerHTML = logs.map(l => `
            <div class="list-item">
                <div>
                    <strong>${l.text}</strong>
                    <span>${l.time}</span>
                </div>
                <span class="badge badge-${l.type === 'warning' ? 'warning' : 'default'}">${l.type}</span>
            </div>
        `).join('');
    }

    // Chat handlers
    document.getElementById('sendChatBtn')?.addEventListener('click', sendChat);
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => e.key === 'Enter' && sendChat());

    function sendChat() {
        const input = document.getElementById('chatInput');
        const box = document.getElementById('chatBox');
        let text = input.value.trim();
        if (!text) return;

        const email = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phone = /(\+?\d{1,4}?[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
        const hasSensitive = email.test(text) || phone.test(text);

        const safeText = hasSensitive ? '[REDACTED FOR PRIVACY]' : text;

        const msg = document.createElement('div');
        msg.className = 'chat-message';
        msg.textContent = safeText;
        msg.style.cssText = 'background:' + (hasSensitive ? 'var(--color-warning)' : 'var(--color-primary)') + '; color:white; padding:8px 12px; border-radius:6px; margin-bottom:8px;';
        box.appendChild(msg);
        input.value = '';
        box.scrollTop = box.scrollHeight;
    }
});
