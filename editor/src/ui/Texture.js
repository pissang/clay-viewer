function TextureUI(parent, object, key, params) {
    ControlKit.ObjectComponent.apply(this, arguments);

    this._object = object;
    this._key = key;

    this._onChange = params.onChange || function () {};

    var self = this;

    var wrap = this._wrapNode;
    wrap.setStyleClass('texture-wrap');

    var img = document.createElement('img');
    this._img = img;

    wrap.getElement().appendChild(img);

    this.update();

    this._wrapNode.getParent().setHeight(105);

    var liEl = this._wrapNode.getParent().getElement();
    FileAPI.event.dnd(liEl, function (over) {
        over ? liEl.classList.add('drag-hover')
            : liEl.classList.remove('drag-hover');
    }, function (files) {
        var imgFile = files.filter(function (file) {
            return file.type.match(/image/);
        })[0];

        if (imgFile) {
            object[key] = URL.createObjectURL(imgFile);

            self.update();

            self._onChange(imgFile);
        }
    });
}

TextureUI.prototype = Object.create(ControlKit.ObjectComponent.prototype);
TextureUI.prototype.constructor = TextureUI;

TextureUI.prototype.update = function () {
    var value = this._object[this._key];
    this._img.src = value && value.toLowerCase() !== 'none' ? value : './img/chessboard.jpg';
    this._img.style.opacity = this._object[this._key] ? 1 : 0.5;
};


export default TextureUI;