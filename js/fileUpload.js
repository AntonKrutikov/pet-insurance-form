const MAX_FILES_COUNT = 10 //Total files count in both areas (filesToUpload size)
const MAX_FILE_SIZE = 10485760 //10 Mb

let filesToUpload = [];


//Format bytes to readable size
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

document.querySelectorAll(".files").forEach(fileSection => {
    let fileInput = fileSection.querySelector('input[type="file"]');
    let fileList = fileSection.querySelector('.fileList');

    if (fileInput === null) return

    fileInput.addEventListener('change', (evt) => {
        let files = []
        for (let i = 0; i < evt.target.files.length; i++) {
            // Not add files if max count exceed or file to big
            if (filesToUpload.length < MAX_FILES_COUNT) {
                filesToUpload.push(evt.target.files[i]);
                if (evt.target.files[i].size <= MAX_FILE_SIZE) {
                    files.push({file: evt.target.files[i], type: 'ok'})
                } else {
                    //Add file to display only if max size exceed
                    files.push({file: evt.target.files[i], type: 'error', errText: 'File is too large'})
                }
            }
        };

        for (let i = 0; i < files.length; i++) {
            let f = files[i];

            let fileName = document.createElement('div');
            fileName.classList.add('fileName');
            fileName.innerText = `${f.file.name}`;

            let span = document.createElement('span');
            span.innerText = `${formatBytes(f.file.size)}`;

            let removeLink = document.createElement('a');
            removeLink.classList.add('removeFile');
            removeLink.href = '#';
            removeLink.dataset.fileid = i;
            removeLink.innerHTML = '<i class="fas fa-times"></i>';

            let container = document.createElement('div');
            container.classList.add('file-info');

            let div = document.createElement('div');
            div.classList.add('file-list-item');

            div.appendChild(container);

            container.appendChild(fileName);
            container.appendChild(span);
            div.appendChild(removeLink);

            if (f.type == 'error') {
                // Add class to container of item
                div.classList.add('file-size-error')
                
                // Add span with error text inside
                error = document.createElement('strong')
                error.innerText = ` · ${f.errText}`
                // If you need class on span - add here
                // error.classList.add('file-size-error')

                container.appendChild(error)
            }

            fileList.appendChild(div);

            removeLink.addEventListener('click', (e) => {
                e.preventDefault()
                for (let i = 0; i < filesToUpload.length; i++) {
                    if (filesToUpload[i].name == f.file.name) {
                        filesToUpload.splice(i, 1);
                    }
                }

                fileList.removeChild(div)
            })
        }
    })
})
