# yoshi 개발자 노트

마크업 개발자 정리 내용무
1. 필요한 내용 정리
2. 깃허브 저장소 생성 및 토큰 생성 세팅 url
- 깃허브 저장소 및 미리보기 : 
- 토큰 생성 url : https://cpro95.tistory.com/456

제이쿼리 플러그인
https://jquery.malsup.com/
ajax에서 form 태그에 관련된 플러그인도 있다
http://www.trirand.com/blog/ 제이쿼리 그리드 플러그인

깃 사용법 중 이전 커밋으로 되돌리는 방법
- 1. 터미널접속후 git log , git reflog
- 2. 해당 커밋내용 찾은후
		git reset --hard {commitID}
- 3. 해당 유실된 커밋만 현재 브랜치로 가져오려면 아래처럼 체리픽을 이용한다.
		git cherry-pick {commitID}