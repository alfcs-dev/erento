(function() {
    "use strict";
    describe('Photos by Album Controller', function() {
        beforeEach(module("my.templates"));
        beforeEach(module('stateMock'));
        var photosCtrl, $q, deferred, scope, $stateParams, stateService, albumName, stateName = "album";
        beforeEach(module('app', function($provide) {
            albumName = {};
            $provide.value('albumName', albumName);
        }));

        beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, dataService, state, _$stateParams_) {
            $q = _$q_;
            scope = _$rootScope_.$new();
            stateService = state;
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
            stateService.expectTransitionTo(stateName, params);
            scope.$apply();
            console.log(photosCtrl);
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