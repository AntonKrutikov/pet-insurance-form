document.body.classList.remove('preload');

// Open and close Nav
function openMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.add("show");
    document.body.classList.add("overflow-hidden");
}
function closeMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.remove("show");
    document.body.classList.remove("overflow-hidden");
}

document.querySelectorAll('.dropdown').forEach(el => {
    let btn = el.querySelector('button');
    el.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault()
            btn.innerText = a.innerText;
        })
    })
});


//provider validation
document.querySelectorAll("#providerName, #coverageEndDate").forEach((ele) => {
    ele.addEventListener("input", function (e) {
        let providerName = document.querySelector('#providerName');
        let coverageEndDate = document.querySelector('#coverageEndDate');

        let saveProvider = document.getElementById('saveProvider');



        if (providerName.value.length == 0 || coverageEndDate.value.length == 0) {
            saveProvider.classList.add("disabled");
            return false;
        } else {
            saveProvider.classList.remove("disabled");
        }
    });
});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


// Claims Payout
function showClaimsPayoutBlock() {
    let block = document.getElementById('claimsPayoutBlock');

    block.style.display = "block";
}
function claimsPayoutType() {
    let directDepositBlock = document.getElementById('directDepositBlock');
    let mailedCheckBlock = document.getElementById('mailedCheckBlock');

    if (
        document.getElementById('directDeposit').checked) {
        directDepositBlock.style.display = "block";
        mailedCheckBlock.style.display = "none";
    } else if (
        document.getElementById('mailedCheck').checked) {
        directDepositBlock.style.display = "none";
        mailedCheckBlock.style.display = "block";
    }
}
function cancelClaimsPayout() {
    let block = document.getElementById('claimsPayoutBlock');

    block.style.display = "none";
}





let glideSlider = document.getElementsByClassName('glide');
if (glideSlider.length > 0) {
    const config = {
        type: 'carousel',
        perView: 3.5,
        breakpoints: {
            1024: {
                perView: 1.7
            },
            767: {
                perView: 1
            }
        },
        peek: {
            before: 50,
            after: 50
        }
    };
    new Glide('.glide', config).mount();
}


//enables tooltips from bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


const passwordShowHide = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
        const password = el.parentNode?.querySelector('input[type=password]')
        el.addEventListener('click', () => {
            password.type = password.type == 'password' ? 'text' : 'password'
        })
    })
}

passwordShowHide('.input-group > .input-group-text')


//////////
// FORM //
//////////

class FormManager {
    constructor() {
        this.tabs = Array.from(document.querySelectorAll('.form-tab'))
        this.steps = Array.from(document.querySelectorAll('.stepper-item'))
        
        this.tabHandlers = []
        this.result = []

        this.hideAll()
        this.current = 0
        this.show(this.current)

        document.querySelectorAll('form button[type="back"]').forEach(b => {
            b.addEventListener('click', e => {
                e.preventDefault()
                this.prev()
            })
        })
    }

    hideAll() {
        for (const tab of this.tabs) {
            tab.style.display = 'none'
        }
    }

    show(n) {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
        this.tabs[n].style.display = null
        for (const [i, step] of this.steps.entries()) {
            step.classList.remove('active')
            if (i == n) {
                step.classList.add('active')
            }
        }
    }

    next() {
        if (this.tabs.length > this.current) {
            this.hideAll()
            this.current++
            this.show(this.current)
            if (this.tabHandlers[this.current].onShow) this.tabHandlers[this.current].onShow()
        }
    }

    prev() {
        if (this.current >= 0) {
            this.hideAll()
            this.current--
            this.show(this.current)
        }
    }

    addResult(groupName, data) {
        this.result[groupName] = data
    }
}

class DetailsTab {
    constructor(form, formManager) {
        this.form = form
        this.formManager = formManager

        this.fields = {
            petName: this.formField('select', '.dropdown-select#selectPet', 'petName'),
            reasonForPetVisit: this.formField('input', '#reasonForPetVisit', 'reasonForPetVisit'),
            submittedAnInvoiceBefore: this.formField('radio', 'input[name="submittedAnInvoiceBefore"]', 'submittedAnInvoiceBefore'),
            petFirstShowSignsOfCondition: this.formField('input', 'input#petFirstShowSignsOfCondition', 'petFirstShowSignsOfCondition'),
            payTheClaimBy: this.formField('radio', 'input[name="payTheClaimBy"]', 'payTheClaimBy'),
            anotherPetHealthInsurance: this.formField('radio', 'input[name="anotherPetHealthInsurance"]', 'anotherPetHealthInsurance'),
            approximateDateOfBirth: this.formField('input', 'input#approximateDateOfBirth', 'approximateDateOfBirth'),
            approximateDateOfAdoption: this.formField('input', 'input#approximateDateOfAdoption', 'approximateDateOfAdoption'),
            isPetNeutered: this.formField('radio', 'input[name="isPetNeutered"]', 'isPetNeutered'),
            approximateDateOfNeuter: this.formField('input', 'input#approximateDateOfNeuter', 'approximateDateOfNeuter'),
            selectedHospital: this.formField('select', '#hospitalContainer .dropdown-select', 'selectedHospital'),
        }

        this.sections = {
            submittedBefore: this.formSection('#showBlock1'),
            providers: this.formSection('#showBlock2'),
            addProviderButton: this.formSection('#addProviderBtn'),
            addProviderFieldSet: this.formSection('#providerContainer'),
            petNeutered: this.formSection('#showBlock3'),
            addHospitalBtn: this.formSection('#addHospitalBtn'),
            addHospitalFieldSet: this.formSection('#hospitalContainer')
        }

        // Provider
        this.providers = []
        form.querySelector('#addProviderBtn')?.addEventListener('click', e => {
            this.sections.addProviderButton.hide()
            this.sections.addProviderFieldSet.show()
        })
        form.querySelector('#closeProvider')?.addEventListener('click', e => {
            this.sections.addProviderButton.show()
            this.sections.addProviderFieldSet.hide()
        })
        form.querySelector('#saveProvider')?.addEventListener('click', e => {
            this.addProvider(e.target, '#providers')
            this.sections.addProviderButton.show()
            this.sections.addProviderFieldSet.hide()
        })

        // Hospitals
        this.hospitals = []

        form.querySelector('#addHospitalBtn')?.addEventListener('click', e => {
            this.sections.addHospitalBtn.hide()
            this.sections.addHospitalFieldSet.show()
        })
        form.querySelector('#closeHospital')?.addEventListener('click', e => {
            this.sections.addHospitalBtn.show()
            this.sections.addHospitalFieldSet.hide()
            this.selectedHospital = null
        })
        form.querySelector('#saveHospital')?.addEventListener('click', e => {
            this.addHospital(e.target, '#hospitals')
            this.sections.addHospitalBtn.show()
            this.sections.addHospitalFieldSet.hide()
            this.selectedHospital = null
        })

        // Submit button
        form.querySelector('a[type="submit"]')?.addEventListener('click', e => {
            e.preventDefault()
            this.submit()
        })
    }

    formField(type, selector, target) {
        if (['input', 'textarea'].includes(type)) {
            this.form.querySelector(selector)?.addEventListener('change', e => {
                this[target] = e.target.value
            })
        } else if (type == 'select') {
            this.form.querySelectorAll(`${selector} .dropdown-item`).forEach(item => {
                item.addEventListener('click', e => {
                    this[target] = e.target.innerText
                })
            })
        } else if (type == 'radio') {
            this.form.querySelectorAll(selector).forEach(radio => {
                radio.addEventListener('change', e => {
                    this[target] = e.target.value
                })
            })
        }
    }

    formSection(selector, showCallback, hideCallback) {
        const section = this.form.querySelector(selector)
        return {
            show() {
                section.style.display = null
                if (showCallback) showCallback()
            },
            hide() {
                section.style.display = 'none'
                if (hideCallback) hideCallback()
            }
        }
    }

    addProvider(saveButton, providersTarget) {
        const container = saveButton.parentNode
        if (container) {

            const name = container.querySelector('input#providerName')?.value
            const date = container.querySelector('input#coverageEndDate')?.value

            if (this.providers.findIndex(p => p.name == name) == -1) {

                let endDate = new Date(date)
                endDate.setDate(endDate.getDate() + 1)

                this.providers.push({
                    name: name,
                    endDate: endDate.toISOString()
                })

                const div = document.createElement('div');
                div.classList.add('selected-hospital');

                div.innerHTML = `
                    <span class="provider-name">${name}
                        <span class="provider-date"> - ${endDate.toLocaleDateString()}</span>
                    </span>
                    <span class="close-span"><i class="fas fa-times"></i></span>
                `

                div.querySelector('.close-span').addEventListener('click', e => {
                    div.parentNode?.removeChild(div)
                    this.providers = this.providers.filter(p => p.name != name)
                })

                document.querySelector(providersTarget)?.appendChild(div)

            }

            container.querySelectorAll('input').forEach(i => i.value = null)

        }
    }

    addHospital(saveButton, hospitalsTarget) {
        const container = saveButton.parentNode
        if (container) {

            const name = container.querySelector('#selectHospitalBtn')?.innerText

            if (!this.hospitals.includes(name)) {

                this.hospitals.push(name)

                const div = document.createElement('div');
                div.classList.add('selected-hospital');

                div.innerHTML = `
                    <span class="hospital-name">${name}</span>
                    <span class="close-span"><i class="fas fa-times"></i></span>
                `

                div.querySelector('.close-span').addEventListener('click', e => {
                    div.parentNode?.removeChild(div)
                    this.hospitals = this.providers.filter(h => h != name)
                })

                document.querySelector(hospitalsTarget)?.appendChild(div)

            }

            container.querySelectorAll('input').forEach(i => i.value = null)

        }
    }

    get submittedAnInvoiceBefore() {
        return this._submittedAnInvoiceBefore
    }
    set submittedAnInvoiceBefore(value) {
        this._submittedAnInvoiceBefore = value
        value == 'No' ? this.sections.submittedBefore.show() : this.sections.submittedBefore.hide()
    }

    get anotherPetHealthInsurance() {
        return this._anotherPetHealthInsurance
    }
    set anotherPetHealthInsurance(value) {
        this._anotherPetHealthInsurance = value
        value == 'Yes' ? this.sections.providers.show() : this.sections.providers.hide()
    }

    get isPetNeutered() {
        return this._isPetNeutered
    }
    set isPetNeutered(value) {
        this._isPetNeutered = value
        value == 'Yes' ? this.sections.petNeutered.show() : this.sections.petNeutered.hide()
    }

    get selectedHospital() {
        return this._selectedHospital
    }
    set selectedHospital(value) {
        this._selectedHospital = value
        this.form.querySelector('#selectHospitalBtn').innerText = value ?? 'Select a hospital'

        if (value && value !== 'Select a hospital') {
            this.form.querySelector('#saveHospital').classList.remove('disabled')
        } else {
            this.form.querySelector('#saveHospital').classList.add('disabled')
        }
    }

    validate() {
        //TODO: validations
        return true
    }

    submit() {
        if (this.validate()) {
            this.formManager.addResult('details', this.toJSON())
            this.formManager.next()
        }
    }

    toJSON() {
        const data = {
            petName: this.petName,
            reasonForPetVisit: this.reasonForPetVisit,
            submittedAnInvoiceBefore: this.submittedAnInvoiceBefore,
            petFirstShowSignsOfCondition: this.petFirstShowSignsOfCondition,
            payTheClaimBy: this.payTheClaimBy,
            anotherPetHealthInsurance: this.anotherPetHealthInsurance,
            providers: this.providers,
            approximateDateOfBirth: this.approximateDateOfBirth,
            approximateDateOfAdoption: this.approximateDateOfAdoption,
            isPetNeutered: this.isPetNeutered,
            approximateDateOfNeuter: this.approximateDateOfNeuter,
            hospitals: this.hospitals
        }
        return data
    }
}

class InvoiceTab  {
    constructor(form, formManager) {
        this.form = form
        this.formManager = formManager

        // Submit
        this.form.querySelector('a[type="submit"]')?.addEventListener('click', e => {
            e.preventDefault()
            this.submit()
        })
    }

    get files() {
        return this.form.querySelector('input[name="files1"]')
    }

    validate() {
        return true
    }

    submit() {
        // Here can be direct upload or saving files to formManager
        if (this.validate()) {
            this.formManager.addResult('files', this.files)
            this.formManager.next()
        }
    }
}

class ReviewTab  {
    constructor(form, formManager) {
        this.form = form
        this.formManager = formManager

        // Submit
        this.form.querySelector('a[type="submit"]')?.addEventListener('click', e => {
            e.preventDefault()
            this.submit()
        })

        // Load pdf on click
        this.form.querySelector('a#showInvoicePdfModal')?.addEventListener('click', e => {
            // Download prepared invoice logic
            const invoicePdfUrl = 'img/sample.pdf'
            const iframe = this.form.querySelector('#invoicePdfModal iframe')
            if (iframe) iframe.src = invoicePdfUrl
        })
    }

    validate() {
        return true
    }

    submit() {
        if (this.validate) {

            console.log(this.formManager.result)
            // Submit logic here

            // Show modal on success
            const modal = bootstrap.Modal.getOrCreateInstance(this.form.querySelector('#exampleModal'))
            modal.show()

            //Show another on error
            //...
        }
    }
}

const formManager = new FormManager()

const detailsTab = new DetailsTab(document.querySelector('form#details'), formManager)
const invoiceTab = new InvoiceTab(document.querySelector('form#invoice'), formManager)
const reviewTab = new ReviewTab(document.querySelector('form#review'), formManager)

formManager.tabHandlers = [detailsTab, invoiceTab, reviewTab]