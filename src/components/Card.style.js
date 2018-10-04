export const style = () => `
    .card {
      display: grid;
      grid-template-columns: repeat(4, 1fr [col-start]);
      justify-items: center;
      width: 100%;
    }
    
    card-item {
      margin: 10px;
      width: 120px
      height: auto
    }
    
    .fetch-more-container {
      display: flex;
      justify-content: center;
    }
    .fetch-more {
      width: 120px;
      height: 40px;
    }
    `;
