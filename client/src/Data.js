import config from './config';

export default class Data {
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url =  config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      //set the auth header
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }



  //allows to get all courses 
  async getCourses() {
    const response = await this.api(
      '/courses', 
      'GET', 
      null);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }
  //allows to display any of the course detail
  async getCourse(id) {
    const response = await this.api(
      `/courses/${id}`, 
      'GET', 
      null);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return null;
    } else {
      console.error(response.status, id);
      throw new Error();
    }
  }
  //creates new course by user
  async createCourse(course, emailAddress, password) {
    const response = await this.api(
      `/courses`, 
      'POST', 
      course, 
      true, {
        emailAddress, 
        password
      }
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
//update an existing course
  async updateCourse(id, emailAddress, password, course) {
    const response = await this.api(
      `/courses/${id}`, 
      'PUT', 
      course, 
      true, {
      emailAddress,
      password
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.message;
      });
    } else if (response.status === 403) {
      return response.json().then(data => {
        console.log(data);
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
  
//delete course
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(
      `/courses/${id}`,
      'DELETE',
      null,
      true,{ 
        emailAddress, 
        password 
      }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return [];
    } else {
      throw new Error();
    }
  }
  
  //user authentication.
  async getUser(emailAddress, password) {
    const response = await this.api(
      `/users`, 
      'GET', 
      null, 
      true, {
      emailAddress,
      password
      }
    );
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  //create a user
  async createUser(user) {
    const response = await this.api(
      '/users', 
      'POST', 
      user
      );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json()
        .then(data => {
        return data.errors;
        });
    } else {
      throw new Error();
    }
  }
}
