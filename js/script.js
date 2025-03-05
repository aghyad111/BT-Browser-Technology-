document.addEventListener('DOMContentLoaded', function() {
    // Formulier secties
    const sections = document.querySelectorAll('.form-section');
    
    // Navigatie knoppen
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    // Voortgangsindicator
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Formulier opslaan in localStorage
    function saveFormData() {
        const formData = {};
        const inputs = document.querySelectorAll('input');
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    formData[input.name] = input.value;
                }
            } else {
                formData[input.name] = input.value;
            }
        });
        
        localStorage.setItem('erfbelastingFormData', JSON.stringify(formData));
    }

    // Formulier herstellen uit localStorage
    function restoreFormData() {
        const savedData = localStorage.getItem('erfbelastingFormData');
        
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            for (const fieldName in formData) {
                const inputs = document.getElementsByName(fieldName);
                
                if (inputs.length > 0) {
                    if (inputs[0].type === 'radio') {
                        const radioValue = formData[fieldName];
                        inputs.forEach(input => {
                            if (input.value === radioValue) {
                                input.checked = true;
                            }
                        });
                    } else {
                        inputs[0].value = formData[fieldName];
                    }
                }
            }
        }
    }
    
    // Event listeners voor veld opslaan
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', saveFormData);
        input.addEventListener('blur', saveFormData);
    });

    // Event listeners voor navigatieknoppen met HTML5 validatie
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = document.querySelector('.form-section.active');
            const formFields = currentSection.querySelectorAll('input:invalid');
            
            // Als er geen ongeldige velden zijn, ga naar de volgende sectie
            if (formFields.length === 0) {
                goToNextSection();
            } else {
                // Focus op het eerste ongeldige veld
                formFields[0].focus();
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevSection);
    });
    
    // Functie om naar de volgende sectie te gaan
    function goToNextSection() {
        const currentSection = document.querySelector('.form-section.active');
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            currentSection.classList.remove('active');
            sections[currentIndex + 1].classList.add('active');
            updateProgress(currentIndex + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Functie om naar de vorige sectie te gaan
    function goToPrevSection() {
        const currentSection = document.querySelector('.form-section.active');
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            currentSection.classList.remove('active');
            sections[currentIndex - 1].classList.add('active');
            updateProgress(currentIndex - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Functie om de voortgangsindicator bij te werken
    function updateProgress(activeIndex) {
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            
            if (index === activeIndex) {
                step.classList.add('active');
            } else if (index < activeIndex) {
                step.classList.add('completed');
            }
        });
    }
    
    // Herstel opgeslagen formulier data bij het laden van de pagina
    restoreFormData();
});