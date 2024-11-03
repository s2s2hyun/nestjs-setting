module.exports = {
  apps: [
    {
      name: "nest-app",                 // PM2 앱 이름
      script: "dist/main.js",           // 실행할 파일 경로
      instances: 1,                     // 클러스터 모드로 실행할 인스턴스 수 (1이면 싱글)
      exec_mode: "cluster",             // 클러스터 모드
      watch: true,                      // 파일 변경 시 자동 재시작
      env: {
        NODE_ENV: "production",
        PORT: 3000,                     // NestJS가 사용할 포트
	HOST:"127.0.0.1",	
      JWT_SECRET: "dxGiJ0s5Sw8YIA0wskm03mGlg2AhHeje",
        DB_HOST: "52.79.235.216",
        DB_USER: "s2s2hyun",
        DB_PASSWORD: "Adlaehdgus1!",
        DB_DATABASE: "mydb",
        DB_TIMEZONE: "+09:00",
        DB_CONNECT_TIMEOUT: 30000
      }
    }
  ]
};



