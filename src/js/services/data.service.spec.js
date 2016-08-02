(function() {
    "use strict";
    describe('dataservice, API consuming service', function() {
        var dataService, $httpBackend, deferred, scope;
        beforeEach(function() {
            module('app');
            inject(function(_dataService_, $injector, $q, $rootScope) {
                $httpBackend = $injector.get('$httpBackend');
                dataService = _dataService_;
            });
            init();
        });

        function init() {
            $httpBackend.whenGET('http://jsonplaceholder.typicode.com/albums/').respond(200, [{
                userId: 1,
                id: 1,
                title: "quidem molestiae enim"
            }, {
                userId: 1,
                id: 2,
                title: "sunt qui excepturi placeat culpa"
            }, ]);
            $httpBackend.whenGET('http://jsonplaceholder.typicode.com/album/1/photos/').respond(200, [{
                albumId: 1,
                id: 1,
                title: "accusamus beatae ad facilis cum similique qui sunt",
                url: "http://placehold.it/600/92c952",
                thumbnailUrl: "http://placehold.it/150/30ac17"
            }, {
                albumId: 1,
                id: 2,
                title: "reprehenderit est deserunt velit ipsam",
                url: "http://placehold.it/600/771796",
                thumbnailUrl: "http://placehold.it/150/dff9f6"
            }, {
                albumId: 1,
                id: 3,
                title: "officia porro iure quia iusto qui ipsa ut modi",
                url: "http://placehold.it/600/24f355",
                thumbnailUrl: "http://placehold.it/150/1941e9"
            }]);
        }



        it('Should define the instance of the service object and have an getFn method', function() {
            expect(dataService).toBeDefined();
            expect(dataService.getFn).toBeDefined();
            expect(typeof dataService.getFn).toBe("function");
        });

        it('should throw an error if called without an url', function() {
            expect(function() { dataService.getFn(); }).toThrow(); //Defined a anonimous function that will throw an error if called withoud url;
        });

        it('should return a promise and resolve or reject it', function() {
            var albumsUrl = 'http://jsonplaceholder.typicode.com/albums/';
            var photosUrl = 'http://jsonplaceholder.typicode.com/album/1/photos/';
            var test1 = dataService.getFn(albumsUrl); //Passing a valid url
            var test2 = dataService.getFn(photosUrl); //Passing a valid url
            var albumsResult, photosResult;
            expect(albumsResult).toBe(undefined);
            expect(photosResult).toBe(undefined);

            test1.then(function(data) {
                albumsResult = data;
                expect(albumsResult.length).toBeGreaterThan(0);
                expect(albumsResult[0].userId).not.toBe(undefined);
            });

            test2.then(function(data) {
                photosResult = data;
                expect(photosResult.length).toBeGreaterThan(0);
            });
            // flushes pending requests
            $httpBackend.flush();
        });
    });
})();