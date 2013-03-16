function EditView() {
    var self = this;

    ko.utils.extend(self, ViewBaseInstance);

    self.Container = $('#EditView');

    self.Show = function (data) {
        self.Movie(data);
        self.ShowContainer();
    };

    self.Submit = function () {
        var ajaxData = ko.toJSON(self.Movie);
        $.ajax({
            type: "PUT",
            url: "API/MoviesAPI/" + self.Movie().ID(),
            contentType: 'application/json; charset=utf-8',
            data: ajaxData,
            success: function (result) {
                ViewManagerInstance.Submit();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }
    

    self.Movie = ko.observable(new Movie());

}