
function extension(){

  var self = this;

  self.getCurrentTabUrl = function(callback){

      // https://developer.chrome.com/extensions/tabs#method-query
      var queryInfo = {
        active: true,
        currentWindow: true
      };
      chrome.tabs.query(queryInfo, function(tabs) {
      
          var tab = tabs[0];
          var url = tab.url;
          console.assert(typeof url == 'string', 'tab.url should be a string');
          callback(url);
      });

  };

  self.init = function(){

      self.getCurrentTabUrl(self.process);
  };

  self.process = function(url){

      if(self.validate.isYoutubeUrl(url)){
            
          self.create();            
      }
      else{
        
      }
  };

  self.create = function(){

    //toggle button
    var btnPlayVideo = document.getElementById('btnPlayVideo');
    btnPlayVideo.onclick = function(){


        var script = "var __bbtn = document.getElementsByClassName('ytp-play-button ytp-button')[0];";
        script += "__bbtn.click();"; 
        script += "__bbtn.getAttribute('aria-label');";

        chrome.tabs.executeScript({
            code: script
        },
        function(results){

          var _b = document.getElementById('btnPlayVideo');
          _b.innerText = results[0];
        });
    };

    //close ad button
    var btnCloseAd = document.getElementById('btnCloseAd');
    btnCloseAd.onclick = function(){

        var script = "var __bbtn2 = document.getElementsByClassName('close-button')[0];";
        script += "__bbtn2.click();"; 

        chrome.tabs.executeScript({code: script});
    };

    //skip ad button
    var skipAdBtn =document.getElementById('btnSkipAd');
    skipAdBtn.onclick = function(){

        var script = "var __bbtn3 = document.getElementsByClassName('videoAdUiSkipButton videoAdUiAction')[0];";
        script += "__bbtn3.click();"; 

        chrome.tabs.executeScript({code: script});
    };
  };


  function urlValidiation(){

    var me = this;

    me.isYoutubeUrl = function(url){

        if(url)
          return (url.indexOf('youtube') > -1);

        return false;
    };
  };
  self.validate = new urlValidiation();

  self.init();
};



//register at load
document.addEventListener('DOMContentLoaded', extension)
