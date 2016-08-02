(function() {
    "use strict";
    describe('Photos by Album Controller', function() {
        beforeEach(module("my.templates"));
        var photosCtrl, $q, deferred, scope, $stateParams, $state, albumMock, state = "album";
        beforeEach(module('app', function($provide) {
            $provide.value('albumName', albumMock = {});
        }));

        beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, dataService, _$state_, _$stateParams_) {
            $q = _$q_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $stateParams = _$stateParams_;
            deferred = _$q_.defer();
            spyOn(dataService, 'getFn').and.returnValue(deferred.promise);
            photosCtrl = _$controller_('photosCtrl', {
                dataService: dataService
            });
        }));

        it('Should define correctly the controller', function() {
            expect(photosCtrl).toBeDefined();
        });
        it('Should have an empty array of photes on loading', function() {
            expect(photosCtrl.photos).toBeDefined();
            expect(photosCtrl.photos.length).toBe(0);
        });

        it('should respond to URL', function() {
            var params = { albumId: 1, albumName: 'Test album' };
            expect($state.href(state, params)).toEqual('#/album/1');
        });

        it('should resolve data for the photos', function() {
            expect(photosCtrl.photos.length).toBe(0);
            deferred.resolve([{
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
            scope.$apply();
            expect(photosCtrl.photos.length).toBe(3);
        });
    });
})();