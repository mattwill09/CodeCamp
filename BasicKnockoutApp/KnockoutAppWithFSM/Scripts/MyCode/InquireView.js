function InquireView() {
    var self = this;

    ko.utils.extend(self, ViewBaseInstance);

    self.Container = $('#HomeView');

    self.Show = function () {
        self.ShowContainer();
    };

    self.GetMovieList = function () {
        $.ajax({
            url: "API/MoviesAPI/",
            dataType: 'json',
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    self.AddMovie(x[i].ID, result[i].Title, new Date(result[i].ReleaseDate), result[i].Genre, result[i].Price, result[i].Rating);
                }
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    };

    self.Movies = ko.observableArray([]);

    self.AddMovie = function (ID, Title, ReleaseDate, Genre, Price, Rating) {
        var movie = new Movie();
        movie.ID(ID);
        movie.Title(Title);
        movie.ReleaseDate(ReleaseDate);
        movie.Genre(Genre);
        movie.Price(Price);
        movie.Rating(Rating);

        self.Movies.push(movie);
    };
}