import { 
  BASE_URI,
  httpMethod, 
  httpStatusCode,
  TIMEOUT_SECONDS
} from '../config/constants.js';


class HTTP {
  constructor(baseURI) {
    this.uri = baseURI;
  }

  async get(id=null) {
    try {
      let data; 
      if (id) {
        data = await this._fetch(`${this.uri}/${id}`);
      } else {
        data = await this._fetch(this.uri);  
      }

      return data; 
    } catch (err) {
      throw err; 
    }
  }

  async post(payload) {
    try {
      let data = await this._fetch(this.uri, {
        method: httpMethod.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      return data; 
    } catch (err) {
      throw err; 
    }
  }


  async delete(id) {
    try {
      await this._fetch(`${this.uri}/${id}`, {
        method: httpMethod.DELETE
      })
      return id; 
    } catch (err) {
      throw err; 
    }
  }

  async put(payload) {
    try {
      const data = this._fetch(`${this.uri}/${payload.id}`, {
        method: httpMethod.PUT,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }); 

      return data; 
    } catch (err) {
      throw err; 
    }
  }
  

  async _fetch(endpoint, options) {
    try {
      const response = await Promise.race([
        fetch(endpoint, options),
        this._timeout(TIMEOUT_SECONDS)
      ]);

      if (!response.ok) {
        throw new Error('An unexpected error occurred.')
      }

      switch (response.status) {
        case httpStatusCode.NO_CONTENT: 
          return true; 
        case httpStatusCode.OK: 
        case httpStatusCode.CREATED:
          return await response.json();
      }

    } catch (err) {
      throw err; 
    }
  }

  _timeout(seconds) {
    return new Promise((_, reject) => {
      let plurality = seconds > 1 ? 's': '';
      setTimeout(() => {
        let errorMessage = `The request took too long fam!`;
        errorMessage += `Timeout after ${seconds} second${plurality}.`;

        reject(new Error(errorMessage));
      }, seconds * 1000);
    });
  };

  
}

export default new HTTP(BASE_URI); 