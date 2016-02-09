describe('Work', function() {
  beforeEach(module('app'));

  beforeEach(function(){

  });

  describe('$work factory', function() {

    it('can get an instance of $work', inject(function($work) {
      expect($work).toBeDefined();
    }));
  });
});
