var death = $.jStorage.get('death');
var life = $.jStorage.get('life');
$(function(){
     init();

     $('#dtBox').DateTimePicker();

     $('#start').click(function(){
        if($.jStorage.get('thing_title')){
            $('.dead').slideUp();
            $('#start').html('Start!')
            $('.set').slideDown();
            $.jStorage.deleteKey('thing_title');
            $.jStorage.deleteKey('thing_deadline');
            
            if($('.dead-remain').html() != 'Time\'s up and you\' re dead!'){
                $.jStorage.set('life',$.jStorage.get('life')+1);
            }
        }else{
            var thing = $('#thing').val();
            var time = $('#time').val();
            if(time && thing){
                $.jStorage.set('thing_title',thing);
                $.jStorage.set('thing_deadline',transdate(time));
                $('.set').slideUp();
                init();
            }
        }
        
     })
})

function transdate(endTime){
    // endtime: 03-11-2014 08:12
    var date=new Date();
    date.setFullYear(endTime.substring(6,10));
    date.setMonth(endTime.substring(3,5)-1);
    date.setDate(endTime.substring(0,2));
    date.setHours(endTime.substring(11,13));
    date.setMinutes(endTime.substring(14,16));
    date.setSeconds('00')
    return Date.parse(date)/1000;
}

function transUnix(tm){
    var tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}

function init(){
    if(!death){
        $.jStorage.set('death',0);
    }
    if(!life){
        $.jStorage.set('life',0);
    }
    var dead = new Object();
    dead.title = $.jStorage.get('thing_title');
    dead.date = transUnix($.jStorage.get('thing_deadline'));
    dead.remain = $.jStorage.get('thing_deadline') - Date.parse(new Date())/1000;
    var remain = friendlyTime(dead.remain);

    if(dead.title){
        $('.dead-title').html(dead.title);
        $('.dead-remain').html(remain);
        $('.dead').slideDown();
        $('#start').html('Done!');
    }else{
        $('.set').fadeIn();
    }
    
    updateTime();
    
}

function friendlyTime(remain){
    var $seconds = remain;
    var $minutes = Math.floor( $seconds / 60 );
        var $m_seconds = $seconds - $minutes * 60;
    var $hours   = Math.floor( $seconds / 3600 );
        var $h_minutes = $minutes - $hours * 60;
    var $day     = Math.floor( $seconds / 86400 );
        var $d_hours = $hours - $day * 24;
    if( $seconds == 0 ){
        return 'Time up!';
    }
    if( ( $seconds >= 0 ) && ( $seconds <= 60 ) ){
        return $seconds + ' Seconds remain';
    }
    if( ( $minutes >= 0 ) && ( $minutes <= 60 ) ){
        return $minutes + ' Minutes ' + $m_seconds + ' Seconds remain';
    }
    if( ( $hours >= 0 ) && ( $hours <= 24 ) ){
        return $hours + ' Hours ' + $h_minutes +' Minutes remain';
    }
    if( ( $day >= 1 ) ){
        return $day + ' Days ' + $d_hours + ' Hours remain';
    }
    
    
}

function updateTime() {
    if($.jStorage.get('thing_deadline')){
        var remain = $.jStorage.get('thing_deadline') - Date.parse(new Date())/1000;
        if( remain >= 0){
            remain = friendlyTime(remain);
            $('.dead-remain').html(remain);
            console.log('Time update!'+($.jStorage.get('thing_deadline') - Date.parse(new Date())/1000));
            setTimeout(function(){
                updateTime();
            },1000)
        }else{
            $('.dead-remain').html('Time\'s up and you\' re dead!');
            $.jStorage.set('death',death+1);
        }
        
    }
    
}