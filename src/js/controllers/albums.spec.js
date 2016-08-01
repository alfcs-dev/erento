describe('AlbumsCtrl', function() {
  beforeEach(module('app'));

  var AlbumsCtrl;

  beforeEach(inject(function(_$controller_){
    AlbumsCtrl = _$controller_('AlbumsCtrl');
  }));

    it('Should define correctly the controller', function() {
        expect(AlbumsCtrl).toBeDefined();
    });

    it('Should have a title defined', function(){
        expect(AlbumsCtrl.title).toBe('Availables Albums');
    });

    it('Should have an empty array in which we are going to store the albums', function(){
        expect(AlbumsCtrl.albums.length).toBe(0);
            
    });

});