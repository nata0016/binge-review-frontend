<template>
    <div class="page-container">
      <header class="site-header">
        <div class="logo">
          <span>BingeReview</span>
        </div>
  
        <nav class="main-nav">
          <router-link to="/">Home</router-link>
          <router-link to="/">Reviews</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </nav>
      </header>
  
      <main class="page-content">
        <section class="page-heading">
          <h1>Contact & Feedback</h1>
          <p>
            BingeReview is a classroom project. If you have comments, suggestions, or ideas
            for improvement, we would be happy to hear from you.
          </p>
        </section>
  
      </main>
  
      <footer class="site-footer">
        <p>© 2025 – BingeReview. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  // Page statique
  </script>
  
  <style scoped>
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    color: #111827;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
  }
  
  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 40px;
    border-bottom: 1px solid #e5e7eb;
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .logo span {
    font-weight: 700;
    font-size: 1.35rem;
    letter-spacing: 0.04em;
  }
  
  .main-nav {
    display: flex;
    gap: 20px;
    font-size: 0.95rem;
  }
  
  .main-nav :deep(a) {
    text-decoration: none;
    color: #4b5563;
    position: relative;
    padding-bottom: 2px;
  }
  
  .main-nav :deep(a:hover) {
    color: #111827;
  }
  
  .main-nav :deep(a)::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 1px;
    background: #111827;
    transition: width 0.2s ease;
  }
  
  .main-nav :deep(a:hover)::after {
    width: 100%;
  }
  
  .page-content {
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 16px 48px;
  }
  
  .page-heading h1 {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  .page-heading p {
    color: #6b7280;
    font-size: 0.98rem;
    margin-bottom: 20px;
  }
  
  .contact-section h2 {
    font-size: 1.3rem;
    margin-top: 16px;
    margin-bottom: 6px;
  }
  
  .contact-section p,
  .contact-section li {
    font-size: 0.98rem;
    line-height: 1.6;
    color: #111827;
  }
  
  .contact-section ul {
    margin-left: 20px;
    margin-bottom: 8px;
  }
  
  .site-footer {
    border-top: 1px solid #e5e7eb;
    padding: 18px 16px;
    background-color: #f3f4f6;
    text-align: center;
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 24px;
  }
  </style>
