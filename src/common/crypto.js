import crypto from 'crypto';
/* 加密用户名，密码 */
export default function encode(str) {
  const cipher = crypto.createCipher('aes192', 'deliveryIsen');
  let crypted = cipher.update(str, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
