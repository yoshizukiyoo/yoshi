(() => {

	let yOffset = 0; // windwo.pageYOffset 대신 쓸 변수

	const sceneInfo = [{
			// 0
			type: 'sticky',
			heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			// 1
			type: 'normal',
			heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			// 2
			type: 'sticky',
			heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		},
		// {
		// 	// 3
		// 	type: 'sticky',
		// 	heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
		// 	scrollHeight: 0,
		// 	objs: {
		// 		container: document.querySelector('#scroll-section-4')
		// 	}
		// }
	];

	function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 템플릿문자 쓸때 '' (x) , ``(o) 참고
		}
	}

	function scrollLoop() {

		console.log(yOffset);
	}

	window.addEventListener('resize', setLayout)
	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	})
	// 위의 방식으로 이벤트 리스너를 등록하면, 
	// 사용자 이벤트마다 특정 코드를 실행하는 것이 가능하다.
	// 이벤트 리스너를 이용할 경우 특정 스크롤 이벤트 발생 시 이벤트를 실행

	setLayout();

})()