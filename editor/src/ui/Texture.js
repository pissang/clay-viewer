function TextureUI(parent, object, key, params) {
    ControlKit.ObjectComponent.apply(this, arguments);

    this._object = object;
    this._key = key;

    this._onChange = params.onChange || function () {};
    this._getFileNameByURL = params.getFileName || function (url) { return url; };

    var self = this;

    var wrap = this._wrapNode;
    wrap.setStyleClass('texture-wrap');

    var img = document.createElement('img');
    var deleteEl = document.createElement('div');
    deleteEl.className = 'texture-delete button';
    var uploadEl = document.createElement('div');
    uploadEl.className = 'texture-upload button';

    this._img = img;
    this._uploadEl = uploadEl;

    wrap.getElement().appendChild(img);
    wrap.getElement().appendChild(uploadEl);
    wrap.getElement().appendChild(deleteEl);

    this.update();

    var liEl = this._wrapNode.getParent().getElement();

    function uploadFiles(files) {
        var imgFile = files.filter(function (file) {
            return file.type.match(/image/);
        })[0];

        if (imgFile) {
            object[key] = URL.createObjectURL(imgFile);

            self._onChange(imgFile, object[key]);

            self.update();
        }
    }
    FileAPI.event.dnd(liEl, function (over) {
        over ? liEl.classList.add('drag-hover')
            : liEl.classList.remove('drag-hover');
    }, function (files) {
        uploadFiles(files);
    });

    // Clear
    deleteEl.addEventListener('click', function () {
        object[key] = 'none';
        self.update();
        self._onChange(null, 'none');
    });
    uploadEl.addEventListener('click', function () {
        var el = document.createElement('input');
        el.type = 'file';
        el.onchange = function (e) {
            uploadFiles(Array.prototype.slice.call(el.files));
        };
        el.click();
    });
}

TextureUI.prototype = Object.create(ControlKit.ObjectComponent.prototype);
TextureUI.prototype.constructor = TextureUI;

TextureUI.prototype.update = function () {
    var value = this._object[this._key];
    this._img.src = value && value.toLowerCase() !== 'none' ? value : './img/chessboard.jpg';
    this._img.style.opacity = (value && value != 'none') ? 1 : 0.5;

    var text = this._getFileNameByURL(value) || value || 'none';;
    this._uploadEl.innerHTML = text;
    this._uploadEl.title = text;
};


export default TextureUI;