var timer=null;
function init(){
	//获取图片位置
	var imgInfo=getPosition();
	//加载图片
	getImgs(imgInfo);
	//滚动条改变时图片加载
	$(window).on('scroll',function(){
		getImgs(imgInfo);
	})
	//图片预加载
	timer=setTimeout(function(){
		preLoad(imgInfo);
	},5000)
}
//获取存在对象中的图片信息
function getPosition(){
	//获取图片的位置放在空对象中
	var obj={},
		imgs=$('#wrap img');
		$.each(imgs,function(){
			var t=$(this).offset().top;
			console.log(t)
			if(!obj[t]){
				obj[t]=[];
			}
			obj[t].push($(this));
			
		})
		return obj;	
}
//加载图片
function getImgs(imgInfo){
	var imgH=$(window).scrollTop(),//滚动条向上滚动距离
		scrollT=$(window).height();//视口的高度
		//console.log(imgH+" "+scrollT);
		$.each(imgInfo,function(pos,imgs){		
			//console.log(imgs)
			if(pos<(imgH+scrollT)){
				//图片加载
				$.each(imgs,function(i,pic){
					var picsrc=$(this).data('src');
					if(picsrc&&picsrc!=''){
						$(this).attr('src',$(this).data('src'));
					}
				})
				//图片加载完成需删除对象obj中的图片使下次加载时不在重新加载
				delete imgInfo[pos];
			}
		})
}
//预加载
function preLoad(imgInfo){
	//预加载一行
	var key=null;
	if(!key){
		for(var i in imgInfo){
			key=i;
			break;
		}
	}
	if(!key) return false;
	var imgs=imgInfo[key];//console.log(imgs);//数组
	$.each(imgs,function(i,pic){
		if(pic.data('src')&&pic.data('src')!=0){
			$(this).attr('src',pic.data('src'));
		}
	})
	clearTimeout(timer)
	timer=setTimeout(function(){
		preLoad(imgInfo);
	},2000)
}
init();