lectureApp.service('lectureService', function ($http, $q) {
    const self = this;
    self.baseURL = "http://localhost:5300/api/";

    self.search = function (characterName) {
        const url = self.baseURL + "people/?search=" + characterName;
        return $http.get(url);
    };

    self.register = function (username) {
        const url = self.baseURL + "register/?username=" + username;
        return $http.get(url);
    };

    self.getLectures = function () {
        const url = self.baseURL + "lectures";
        return $http.get(url);
    };
});