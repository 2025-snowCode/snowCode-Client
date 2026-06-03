# snowCode

> 교수와 학생을 잇는 프로그래밍 과제 통합 플랫폼

<img alt="스노우코드_표지" src="https://raw.githubusercontent.com/2025-snowCode/snowCode-Client/902499c4bd2cd18369ed407a74d6b8dbecae085e/public/preview.svg" />

<strong>과제 출제부터 제출, 채점, 피드백까지 — 프로그래밍 과제를 위한 올인원 플랫폼, 'snowCode'<strong/>

1. 원스톱 과제 처리 : 코드 작성, 실행, 제출까지 브라우저 하나로 모두 해결
2. 즉각적인 채점 피드백 : 제출 즉시 자동 채점 결과를 확인하고 오답을 바로 개선
3. 통일된 실행 환경 : 별도 개발 환경 설치 없이 누구나 동일한 환경에서 안정적으로 코드 실행
4. 자동화된 채점 시스템 : 테스트 케이스 기반 자동 채점으로 수동 채점 부담 없이 즉시 결과 제공

<br />

## <img src="./public/favicon.svg" style="width: 30px" alt="favicon" /> 서비스 소개

<img width="1440" height="1024" alt="paint_points" src="https://github.com/user-attachments/assets/cd2243b1-4538-48cf-a151-52b8fdb83e1c" />

---

<img width="1440" height="1024" alt="과제제출" src="https://github.com/user-attachments/assets/14792dfa-a0e9-4edc-921f-7c62b700744e" />

---

<img width="1440" height="1024" alt="강의관리" src="https://github.com/user-attachments/assets/d738e701-cf52-41c9-b00d-b77ec154d5bd" />

---

<img width="1440" height="1024" alt="관제관리" src="https://github.com/user-attachments/assets/c850ab5e-dc72-4e69-b13a-6d44511cdd94" />

---

<img width="1440" height="1024" alt="학생관리" src="https://github.com/user-attachments/assets/fb95c901-2114-4fc1-bf0d-23b75eb109da" />

---

<img width="1440" height="1024" alt="채팅" src="https://github.com/user-attachments/assets/87e7f60b-9be8-4d79-9d86-a8068c3b243b" />

---

<br />

## <img src="./public/favicon.svg" style="width: 30px" alt="favicon" /> Team 기술 스택

| 카테고리                    | 기술 스택                                                                                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI Library**              | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)                                                                                                                                      |
| **Server State Management** | ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge)                                                                                                             |
| **Language**                | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)                                                                                                                       |
| **Build Tool**              | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)                                                                                                                                         |
| **Styling**                 | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)                                                                                                                  |
| **Schema Validation**       | ![Zod](https://img.shields.io/badge/ZOD-3E67B1?logo=zod&logoColor=white&style=for-the-badge)                                                                                                                                            |
| **Linting**                 | ![ESLint](https://img.shields.io/badge/ESLint-3A33D1?style=for-the-badge)                                                                                                                                                               |
| **Package Manager**         | ![Pnpm](https://img.shields.io/badge/Pnpm-F69220?logo=pnpm&logoColor=white&style=for-the-badge)                                                                                                                                         |
| **Deploy**                  | ![VERCEL](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![NGINX](https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=white&style=for-the-badge)                                                                                                                                                                                                                  |

<br />

## <img src="./public/favicon.svg" style="width: 30px" alt="favicon" /> Team 컨벤션
### commit 컨벤션
**commit 태그 종류**

```
✨ feat : 새로운 기능 구현
🔧 modify : 코드 수정 (기능의 변화가 있을 때)
📝 docs : README나 WIKI 등의 문서 수정
➕ add : feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성
🔥 remove : 폴더 또는 파일 삭제, 쓸모없는 코드 삭제
🐛 fix : 버그, 오류 해결
⏪️ rename : 파일 이름 변경 또는 파일 이동시
🪄 refactor : 기능 추가나 버그 수정이 없는 코드 변경 ( 코드 구조 변경 등의 리팩토링 )
🌈 perf : 성능 개선 ( API 호출 횟수, 페이지 로드 시간 등 )
👍 correct : 문법 오류나 타입의 변경, 이름 변경시 ( 세미콜론 추가 등 비즈니스 로직에 변경 없음 )
🎨 style : CSS 스타일 수정
🧪 test : 테스트 추가 또는 이전 테스트 수정
🧹 chore : src 또는 test 파일을 수정하지 않는 기타 변경 사항 ( 빌드/패키지 매니저 설정 변경 등 )
```

<br />

**commit 메시지 형식**
```js
#이슈 번호 커밋 태그: 커밋 내용

// 예시
#1 feat: 회원가입 기능 완료
```

<br />

### Issue 컨벤션

**issue 태그 종류**
```
feat : 기능 추가
fix : 에러 수정, 버그 수정
docs : README, 문서
refactor : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
modify : 코드 수정 (기능의 변화가 있을 때)
perf : 성능 개선 ( API 호출 횟수, 페이지 로드 시간 등 )
chore : 그 외 작업 내용
```

<br />

**issue 제목**
```js
커밋 태그: 커밋 내용

// 예시
feat: 회원가입 구현
```

<br />

**브랜치 이름**
```
feat/#이슈 번호-기능 이름

// 예시
feat/#1-login
```

