export function initDarkMode() {
  // Kiểm tra theme từ localStorage
  if (localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && 
    window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Theo dõi thay đổi system theme
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    })
} 