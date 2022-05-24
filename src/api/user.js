import request from '@/common/request';

// 登录请求
export async function userLogin(data) {
  const result = await request.post('/api/user/login', data);
  return result;
}

// 注册请求
export async function userRegister(data) {
  const result = await request.post('/api/user/login', data);
  return result;
}
