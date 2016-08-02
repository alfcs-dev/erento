(function() {
    "use strict";
    describe('Albums Controller', function() {
        beforeEach(module('app'));

        var AlbumsCtrl, $q, deferred, scope;

        beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, dataService) {
            $q = _$q_;
            scope = _$rootScope_.$new();
            deferred = _$q_.defer();
            spyOn(dataService, 'getFn').and.returnValue(deferred.promise);
            AlbumsCtrl = _$controller_('AlbumsCtrl', {
                dataService: dataService
            });
        }));

        it('Should define correctly the controller', function() {
            expect(AlbumsCtrl).toBeDefined();
        });

        it('Should have a title defined', function() {
            expect(AlbumsCtrl.title).toBe('Available Albums');
        });

        it('Should resolve promise or reject for albums', function() {
            expect(AlbumsCtrl.albums).toBeDefined();
            expect(AlbumsCtrl.albums.length).toBe(0);

            deferred.resolve([{
                userId: 1,
                id: 1,
                title: "quidem molestiae enim"
            }, {
                userId: 1,
                id: 2,
                title: "sunt qui excepturi placeat culpa"
            }, {
                userId: 1,
                id: 3,
                title: "omnis laborum odio"
            }]);

            scope.$apply();

            expect(AlbumsCtrl.albums.length).toBeGreaterThan(0);

        });

        it('Should resolve or reject promise for users', function() {
            expect(AlbumsCtrl.users).toBeDefined();
            expect(AlbumsCtrl.users.length).toBe(0);

            deferred.resolve([{
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz",
                address: {
                    street: "Kulas Light",
                    suite: "Apt. 556",
                    city: "Gwenborough",
                    zipcode: "92998-3874",
                    geo: {
                        lat: "-37.3159",
                        lng: "81.1496"
                    }
                },
                phone: "1-770-736-8031 x56442",
                website: "hildegard.org",
                company: {
                    name: "Romaguera-Crona",
                    catchPhrase: "Multi-layered client-server neural-net",
                    bs: "harness real-time e-markets"
                }
            }]);

            scope.$apply();

            expect(AlbumsCtrl.users.length).toBeGreaterThan(0);

        });

        it('Should execute the catch function on the controller', function() {
            expect(AlbumsCtrl.errorLog).toBeUndefined();
            deferred.reject();
            scope.$apply();
        });

    });
})();