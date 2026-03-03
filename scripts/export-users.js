/**
 * Script para exportar TODOS los usuarios de la base de datos Submerso.
 * - Se conecta al backend (http://localhost:8085), hace login como admin y llama a GET /api/admin/users.
 * - El backend lee de MongoDB (base de datos Submerso) con userRepository.findAll() → siempre todos.
 * - Escribe el resultado en info_usuarios.txt en la raíz del proyecto.
 * Ejecutar desde la raíz: node scripts/export-users.js
 */

const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8085/api';
const ADMIN_EMAIL = 'admin@submerso.com';
const ADMIN_PASSWORD = 'Admin.1234';
const OUTPUT_FILE = path.join(__dirname, '..', 'info_usuarios.txt');

async function login() {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });
  if (!res.ok) throw new Error('No se pudo iniciar sesión como admin. ¿Backend en marcha?');
  const json = await res.json();
  return json?.data?.accessToken || json?.accessToken;
}

/** Obtiene TODOS los usuarios de la base de datos Submerso vía API (backend hace findAll()). */
async function getAllUsers(token) {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('No se pudo obtener la lista de usuarios (¿backend en marcha y admin?)');
  const json = await res.json();
  return json?.data || json || [];
}

function buildFileContent(users) {
  const lines = [
    '================================================================================',
    '  SUBMERSO - LISTA DE TODOS LOS USUARIOS DE LA BASE DE DATOS',
    '================================================================================',
    '',
    `  Fuente:           Base de datos Submerso (MongoDB) - todos los usuarios`,
    `  Total de usuarios: ${users.length}`,
    `  Exportado:        ${new Date().toLocaleString('es-ES')}`,
    '',
    '  NOTA CONTRASEÑAS: El admin tiene contraseña en claro (abajo). El resto de',
    '  usuarios tienen la contraseña guardada solo en forma de hash (BCrypt) en la',
    '  base de datos; no se puede recuperar ni mostrar.',
    '',
    '--------------------------------------------------------------------------------',
    '  LISTADO COMPLETO (con contraseña cuando se conoce)',
    '--------------------------------------------------------------------------------',
    ''
  ];

  users.forEach((u, i) => {
    const num = i + 1;
    const email = u.email || '(sin email)';
    const username = u.username || '(sin usuario)';
    const roles = Array.isArray(u.roles) ? u.roles.join(', ') : (u.roles ? String(u.roles) : '-');
    const enabled = u.enabled !== false ? 'Sí' : 'No';
    const createdAt = u.createdAt || '-';

    const isAdmin = email === ADMIN_EMAIL || (roles && roles.includes('ROLE_ADMIN'));
    const passwordLine = isAdmin
      ? `  Contraseña:       ${ADMIN_PASSWORD}`
      : `  Contraseña:       (hash en BD; no recuperable)`;

    lines.push(`  ${num}. ${email}`);
    lines.push(`     Usuario:        ${username}`);
    lines.push(`     Roles:          ${roles}`);
    lines.push(`     Activo:         ${enabled}`);
    lines.push(`     Fecha registro: ${createdAt}`);
    lines.push(`     ${passwordLine}`);
    lines.push('');
  });


  return lines.join('\n');
}

async function main() {
  try {
    console.log('Iniciando sesión como admin...');
    const token = await login();
    console.log('Obteniendo TODOS los usuarios de la base de datos Submerso...');
    const users = await getAllUsers(token);
    const content = buildFileContent(users);
    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`Listo. ${users.length} usuario(s) de la BD exportados a info_usuarios.txt`);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();
