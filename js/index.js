const API_URL_STATE = 'https://climate-action-pledge-microsite.onrender.com/states';
const API_URL_PLEDGES = 'https://climate-action-pledge-microsite.onrender.com/pledges'

// Smooth scroll to pledge form
document.querySelector(".btn-pledge").addEventListener("click", () => {
    const form = document.querySelector("#pledge-form");
    const yOffset = -100; 
    const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' }); 
});

// Loading the states from the server
function loadStates() {
    fetch(API_URL_STATE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(states => {
        const stateSelect = document.getElementById('state');
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state; 
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading states:', error));
}

// Handle pledge form submission
async function handleForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const state = document.getElementById('state').value;
    const type = document.getElementById('profile-type').value;
    const error = document.getElementById('error');
    const commitments = document.querySelectorAll('#pledge-form input[type="checkbox"]:checked');
    const commitmentValues = Array.from(commitments).map(checkbox => checkbox.value);
    error.classList.add('d-none'); // Hide previous error
   
     // Validation
    if (!name) {
        error.textContent = 'Please Enter Your Name.';
         error.classList.remove('d-none');
        return;
    }

    if (!email) {
        error.textContent = 'Please Enter Your Email Id.';
         error.classList.remove('d-none');
        return;
    }

    if (!mobile) {
        error.textContent = 'Please Enter Your Mobile Number.';
         error.classList.remove('d-none');
        return;
    }

    if (!state) {
        error.textContent = 'Please Select Your State.';
         error.classList.remove('d-none');
        return;
    }

    if (!type) {
        error.textContent = 'Please Select your Profile Type.';
         error.classList.remove('d-none');
        return;
    }

    if (commitments.length === 0) {
        error.textContent = 'Please select at least one commitment.';
        error.classList.remove('d-none'); 
        return;
    }

    // Prepare data to save
    const pledgeData = {
        name: name,
        email: email,
        mobile: mobile,
        state: state,
        profile: type,
        commitments: commitmentValues,
        date: new Date().toISOString().split('T')[0]
    };

    // Submit pledge to server
    try {
        const response = await fetch(API_URL_PLEDGES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pledgeData)
        });

        const data = await response.json();
        console.log('Pledge submitted successfully:', data);

        document.getElementById('certName').textContent = name;
        document.getElementById('hearts').textContent = '⭐'.repeat(commitments.length);

        const certModal = new bootstrap.Modal(document.getElementById('certModal'));
        certModal.show();

        // Refresh pledge wall and clear form when modal closes
        document.getElementById('certModal').addEventListener('hidden.bs.modal', () => {
            loadPledgeWall();
            loadKPIs();
            document.getElementById('pledge-form').reset();
        });

    } catch (err) {
        console.error('Error submitting pledge:', err);
        showError('Error submitting pledge. Please try again.');
    }
}

// Download certificate as image
document.getElementById('downloadCert').addEventListener('click', function() {
    const certificate = document.getElementById('certificate');
    html2canvas(certificate, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => console.error('Error generating certificate image:', err));

});

// Load Public Pledge Wall Data
function loadPledgeWall() {
    fetch(API_URL_PLEDGES, {
        method: 'GET',  }
    ).then(response => response.json())
    .then(pledges => {
        const tableBody = document.getElementById('pledge-table-body')
        tableBody.innerHTML = '';
        pledges.forEach((pledge, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index+1}</th>
                <td>${pledge.name}</td>
                <td>${pledge.date}</td>
                <td>${pledge.state}</td>
                <td>${pledge.profile}</td>
                <td>${'⭐'.repeat(pledge.commitments.length)}</td>
            `;
            tableBody.appendChild(row);
        });
    }).catch(error => console.error('Error loading pledges:', error));

}

// Live KPIs Data
function loadKPIs() {
    fetch(API_URL_PLEDGES, {
        method: 'GET',}
    ).then(response => response.json())
    .then(pledges => {
        document.getElementById('achieved-pledges').textContent = pledges.length;
        document.getElementById('working-professionals').textContent = pledges.filter(p => p.profile === 'working-professional').length;
        document.getElementById('students').textContent = pledges.filter(p => p.profile === 'student').length;
        document.getElementById('others').textContent = pledges.filter(p => p.profile === 'other').length;
    }).catch(error => console.error('Error loading KPIs:', error));
}



// Call the function when the page loads
window.addEventListener('DOMContentLoaded', loadStates);
window.addEventListener('DOMContentLoaded', loadKPIs);
window.addEventListener('DOMContentLoaded', loadPledgeWall);
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pledge-form').addEventListener('submit', handleForm);
});
