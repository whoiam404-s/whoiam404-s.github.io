document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('header-video');
  if (video) {
    video.muted = true; // Pastikan muted untuk mendukung autoplay
    video.play().catch(function(error) {
      console.log('Autoplay gagal:', error);
      // Coba ulang setelah 1 detik jika gagal
      setTimeout(() => {
        video.play().catch(function(error) {
          console.log('Autoplay gagal lagi:', error);
        });
      }, 1000);
    });
  }
