new Vue({
    el: '#app',
    data: {
      embed: {
        title: '',
        description: '',
        author: '',
        imageURL: '',
        thumbnailURL: '',
        color: '#7289da' 
      },
      webhookUrl: ''
    },
    methods: {
      postWebhook() {
        // Check if webhook URL is provided
        if (!this.webhookUrl) {
          alert('Please provide a webhook URL.');
          return;
        }
  
        // Prepare the payload
        const payload = {
          embeds: [
            {
              title: this.embed.title,
              description: this.embed.description,
              author: { name: this.embed.author },
              image: { url: this.embed.imageURL },
              thumbnail: { url: this.embed.thumbnailURL },
              color: parseInt(this.embed.color.replace('#', ''), 16) // Convert color to integer
            }
          ]
        };
  
        // Send the embed to the webhook
        fetch(this.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post to webhook.');
          }
          alert('Embed successfully posted to the webhook.');
        })
        .catch(error => {
          console.error(error);
          alert('Error posting embed to the webhook.');
        });
      }
    }
  });
  
