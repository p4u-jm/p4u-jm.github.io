# 공약한판정리 - 기호1번 이재명

## 알립니다
기존 https://gongyak.kr 주소로 호스팅되는 프로젝트는 새로운 선거의 내용을 계속 담아내기 위해 다음의 오픈소스 프로젝트로 옮겨졌습니다. 
- https://github.com/gongyak

본 저장소의 최신 내용도 jm2022 저장소로 옮겨 호스팅됩니다.
- https://github.com/gongyak/jm2022

이곳의 내용은 자료 보존을 위해 유지됩니다.

---

### 목표
20대 대통령선거 기호1번 이재명 후보의 공약을 정리해 보여주는 웹사이트

### 배포 웹사이트
- https://p4u-jm.github.io

### 공약 참고자료

- [더불어민주당 이재명 후보 공약 목록](https://theminjoo.kr/board/lists/electionpromises)
- [재명이네 마을](https://www.jmleetogether.com/)
- [이재명 후보 페이스북](https://www.facebook.com/jaemyunglee)
- [이재명 후보 블로그](https://blog.naver.com/PostList.naver?blogId=jaemyunglee&from=postList&categoryNo=90&parentCategoryNo=90)
- [이재명 후보 유튜브](https://www.youtube.com/channel/UCNJM6dqu70Qr6VaseiW1Org)
- [재명이네 소극장 유튜브](https://www.youtube.com/channel/UCvDMM_L2U4aSd396zXzKhlQ)
- [더불어민주당 유튜브](https://www.youtube.com/c/dailyminjoo)
- [정철 카피라이터 페이스북](https://www.facebook.com/cwjccwjc)

### 코드 참고자료
- https://github.com/e-/Josa.js
- https://github.com/iamdustan/smoothscroll

### 이미지 출처
- https://ko.wikipedia.org/wiki/페이스북#/media/파일:Facebook_f_logo_(2019).svg
- https://ko.wikipedia.org/wiki/카카오톡#/media/파일:KakaoTalk_logo.svg
- https://ko.wikipedia.org/wiki/텔레그램#/media/파일:Telegram_2019_Logo.svg

- https://www.flaticon.com/free-icon/upload_130906
- https://www.flaticon.com/free-icon/plus_1828817
- https://www.flaticon.com/free-icon/link_455893


## Building Docker Container
```zsh
$ docker build -t static:latest .
$ docker run -it --rm -p 3000:3000 static:latest
```