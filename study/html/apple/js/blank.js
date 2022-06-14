(() => {

	let yOffset = 0; // windwo.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

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
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
		}

		if (yOffset < prevScrollHeight) {
			if (currentScene === 0) return; // 브라우저 IE나 사파리에서 당겨졌을때 마이너스값이 나올수있으므로 조건문을 추가하여 0일시에는 리턴으로 돌린다
			currentScene--;
		}

		console.log(currentScene);

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