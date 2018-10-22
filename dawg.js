(function() {
    var $breedSelection = null;
    var $img = null;

    var init = function () {
        $('#ctr').html(`

    <div class="form-group">
  <select class="form-control">
  <option value="">Select breed</option>
  </select>
</div>
 

   <p> 
    <button type="button" class="btn btn-primary">Go</button>
    </p>
    <div class="img">
    </div>
    `);
    $breedSelection = $('#ctr > div > select');
    $img = $('#ctr .img');
    $info = $('.info');
    $info.hide();
    getBreeds();
    }

    var loadBreedToSelect = function(s){
        
        for(var i in s){
            //console.log('i',i)
            //console.log('s[i]' , s[i])
            $breedSelection.append(`<option class="bold">${i}</option>`);
            if(s[i].length){
                for(var ii=0; ii<s[i].length;ii++){
                    console.log(i+'/'+s[i][ii]);
                    $breedSelection.append(`<option value = "${i}/${s[i][ii]}">&raquo;&nbsp;${s[i][ii]}</option>`);
                }
            }  

        }
        $('#ctr > p > button').on('click',function(){
            console.log($breedSelection.val());
            var v = $breedSelection.val();
            if(v!=''){
              getImage(v);
              $info.hide();
            }
            else{
             $img.hide(1000)
             $info.html(`Choose breed`).show( "slow" );
            }
        });
    }

    var loadImageToCtr = function(url){
        console.log('loadImageToCtr',url);
        $img.html(`<img src="${url}">`).show("slow" );
    }

    var getBreeds = function(){
        $.ajax({
            url : "https://dog.ceo/api/breeds/list/all",
            method : "GET",
            dataType : "json"
        }).done(function(r){
           // console.log(r.message);
            loadBreedToSelect(r.message);  
        }).fail(function(x , msg){
          console.log('error:',msg)
        });

       
    };

    var getImage = function(breed){
        $.ajax({
            url:`https://dog.ceo/api/breed/${breed}/images/random`,
            method:'GET',
            dataType:'json'
        }).done(function(ret){
           console.log(ret);
           loadImageToCtr(ret.message);
        }).fail(function(x,msg){
           console.log('error:',msg)
        });
    }


    init();

})();