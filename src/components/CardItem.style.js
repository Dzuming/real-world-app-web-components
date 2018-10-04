export const style = () => `
      .loader {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #39132E;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }
    
      @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }  
      @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }
    `;
