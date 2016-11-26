function getElementsByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}
window.onload=function ()
{
	var oDiv=document.getElementById('automatic');
	
	var oPrevMask=getElementsByClass(oDiv,'prev_div')[0];
	var oNextMask=getElementsByClass(oDiv,'next_div')[0];
	
	var oPrevBtn=getElementsByClass(oDiv,'prev')[0];
	var oNextBtn=getElementsByClass(oDiv,'next')[0];
	
	var oPrevArrow=getElementsByClass(oPrevBtn,'ico')[0];
	var oPrevArrowLight=getElementsByClass(oPrevBtn,'ico1')[0];
	var oPrevTxt=getElementsByClass(oPrevBtn,'txt')[0];
	
	var oNextArrow=getElementsByClass(oNextBtn,'ico')[0];
	var oNextArrowLight=getElementsByClass(oNextBtn,'ico1')[0];
	var oNextTxt=getElementsByClass(oNextBtn,'txt')[0];
	

	var iInitPrevArrow=oPrevArrow.left=oPrevArrow.offsetLeft;

	var iInitPrevArrowLight=oPrevArrowLight.left=oPrevArrowLight.offsetLeft;
	var iInitPrevTxt=oPrevTxt.left=oPrevTxt.offsetLeft;

	var iInitNextArrow=oNextArrow.left=oNextArrow.offsetLeft;
	var iInitNextArrowLight=oNextArrowLight.left=oNextArrowLight.offsetLeft;
	var iInitNextTxt=oNextTxt.left=oNextTxt.offsetLeft;
	
	var aLi=oDiv.getElementsByTagName('ul')[0].getElementsByTagName('li');
	
	var aLiInit=[];
	
	var oLine=getElementsByClass(oDiv, 'line')[0];
	
	var iInterval=150;
	
	var iDuring = 3000;
	
	var i=0;
	
	var timer = null;
	
	for(i=0;i<aLi.length;i++)
	{
		aLiInit[i]={};
		aLi[i].width=aLiInit[i].w=aLi[i].offsetWidth;
		aLi[i].height=aLiInit[i].h=aLi[i].offsetHeight;
		aLi[i].left=aLiInit[i].l=aLi[i].offsetLeft;
		aLi[i].top=aLiInit[i].t=aLi[i].offsetTop;
		aLi[i].alpha=aLiInit[i].alpha=0;
		aLi[i].z=aLiInit[i].z=1;
		aLi[i].rel=aLiInit[i].rel=aLi[i].attributes["rel"].value;
	}

	for(i=0;i<aLi.length;i++)
	{
		aLi[i].style.left=aLiInit[i].l+'px';
		aLi[i].style.top=aLiInit[i].t+'px';
	}
	
	aLi[1].alpha=aLiInit[1].alpha=60;
	aLi[2].alpha=aLiInit[2].alpha=80;
	aLi[3].alpha=aLiInit[3].alpha=100;
	aLi[4].alpha=aLiInit[4].alpha=80;
	aLi[5].alpha=aLiInit[5].alpha=60;
	
	aLi[1].z=aLiInit[1].z=2;
	aLi[2].z=aLiInit[2].z=3;
	aLi[3].z=aLiInit[3].z=4;
	aLi[4].z=aLiInit[4].z=3;
	aLi[5].z=aLiInit[5].z=2;
	
	oLine.getElementsByTagName("a")[0].attributes["href"].value = aLi[3].rel;
	
	timer = setInterval(function (){
	  gotoImg(false);
	},iDuring);
	
	oDiv.onmouseover = function ()
	{
	   clearInterval(timer);
	};
	oDiv.onmouseout = function ()
	{
	   timer = setInterval(function (){
	     gotoImg(false);
	   },iDuring);
	};
	oPrevMask.onmouseover=function ()
	{
		startMove(oPrevArrow, {left: iInitPrevArrow+10}, iInterval);
		startMove(oPrevArrowLight, {left: iInitPrevArrowLight+10, alpha:100}, iInterval);
		startMove(oPrevTxt, {left: iInitPrevTxt-10, alpha:100}, iInterval);
	};
	
	oPrevMask.onmouseout=function ()
	{
		startMove(oPrevArrow, {left: iInitPrevArrow}, iInterval);
		startMove(oPrevArrowLight, {left: iInitPrevArrowLight, alpha:0}, iInterval);
		startMove(oPrevTxt, {left: iInitPrevTxt, alpha:0}, iInterval);
	};
	
	oPrevMask.onmousedown=function ()
	{
		gotoImg(true);
	};
	
	oNextMask.onmouseover=function ()
	{
		startMove(oNextArrow, {left: iInitNextArrow-10}, iInterval);
		startMove(oNextArrowLight, {left: iInitNextArrowLight-10, alpha:100}, iInterval);
		startMove(oNextTxt, {left: iInitNextTxt+10, alpha:100}, iInterval);
	};
	
	oNextMask.onmouseout=function ()
	{
		startMove(oNextArrow, {left: iInitNextArrow}, iInterval);
		startMove(oNextArrowLight, {left: iInitNextArrowLight, alpha:0}, iInterval);
		startMove(oNextTxt, {left: iInitNextTxt, alpha:0}, iInterval);
	};
	
	
	
	oNextMask.onmousedown=function ()
	{
		gotoImg(false);
	};
	
	function gotoImg(bLeft)
	{
		if(bLeft)
		{
			aLiInit.push(aLiInit.shift());
		}
		else
		{
			aLiInit.unshift(aLiInit.pop());
		}
		
		oLine.style.display='none';
		for(i=0;i<aLi.length;i++)
		{   aLi[i].style.zIndex = aLiInit[i].z;
			startMove(aLi[i], {left: aLiInit[i].l, top: aLiInit[i].t, width: aLiInit[i].w, height:aLiInit[i].h, alpha:aLiInit[i].alpha}, 300, function (){  oLine.style.display='block';
			  oLine.getElementsByTagName("a")[0].attributes["href"].value = aLiInit[3].rel;
			});
		}
	};
};

function startMove(obj, oParams, iTime, fnCallBackEnd)
{
	var iInterval=15;
	var iEndTime=(new Date()).getTime()+iTime;
	var iTimes=Math.ceil(iTime/iInterval);
	var oSpeed={};
	
	if(typeof obj.timer=='undefined')
	{
		obj.timer=null;
	}
	
	for(key in oParams)
	{
		oSpeed[key]=(oParams[key]-obj[key])/iTimes;
	}
	
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	obj.timer=setInterval
	(
		function ()
		{
			doMove(obj, oParams, oSpeed, iEndTime, fnCallBackEnd);
		}, iInterval
	);
}

function doMove(obj, oTarget, oSpeed, iEndTime, fnCallBackEnd)
{
	var iNow=(new Date()).getTime();

	if(iNow>=iEndTime)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		setStyle(obj,oTarget,true);

		if(fnCallBackEnd)
		{
			fnCallBackEnd();
		}
	}
	else
	{
		setStyle(obj,oSpeed,false);
	}
}

function setStyle(obj,oParams,bComeplet){
		for(key in oParams)
		{   
		   
		   obj[key] = bComeplet?oParams[key]:obj[key]+oParams[key];

			switch(key)
			{
				case 'alpha':
					obj.style.opacity=obj[key]/100;
					obj.style.filter="alpha(opacity:"+obj[key]+")";
					break;
				case 'width':
				case 'height':
					obj.style[key]=obj[key]+'px';
					break;
				default:
					obj.style[key]=obj[key]+'px';
					break;
			}
	    }		
}