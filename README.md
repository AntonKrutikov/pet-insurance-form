`FormManager` - router between form tabs, respect for show/hide navigate and store tab results

`DetailsTab` - all data and logic for 1 tab
`InvoiceTab` - logic and accessing filesInput from upload
`ReviewTab` - last page with confirmation and modals

Each tab class try to follow same interface:

1. All eventListeners applied in constructor. 
For `DetailsTab` helper methods for wrapping inputs data exists:
    - `formField()` - map DOM element to class getter/setter with logic chosen by type.
    - `formSection()` - wrap sections that heed to be toggled latter
    - `addProvider()` and `addHospitals()` - respect for storing values and adding elements

2. In `validate` method all checks can be putted. Based on instance field values we can for examples toggle errors
3. `submit` check `validate` before, next call `FormManager` for next tab or can execute any `submit` logic


# Accessong bootstrap modal from JS

Each html modal element need to be wrapped to Modal, if we want to toggle it from js.

```js
const modal = bootstrap.Modal.getOrCreateInstance(this.form.querySelector('#exampleModal'))
modal.show()
```

# Pdf in modal

Simple solution: use `iframe`

```html
<div class="modal fade" id="invoicePdfModal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <iframe style="width: 100%; aspect-ratio: 3/4;"></iframe>
            </div>
        </div>
    </div>
</div>
```

```html
<a href="#" id="showInvoicePdfModal" data-bs-toggle="modal" data-bs-target="#invoicePdfModal">
```

Iframe source can be generated on backend and url of pdf returned, next in `click` event we can fetch this url.

# Data

Result of `DetailsTab` - is object
Result of `InvoiceTab` - is input field

Based on backend this data must be converted to FormData or uploaded separatly.