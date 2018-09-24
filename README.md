# tarmac-grid

## Spring based Back end for tarmac-grid

### Spring boot

I've used Spring since is a framkework that I'm familiar with, however not knowing of the current potential it has.

After some research (official docs, StackOverflow and tutorials) I've found that the Spring data-rest sub-module implements **out-of-the-box** all the features I needed.

#### Docs:

* https://spring.io/guides/tutorials/rest/

* https://spring.io/guides/tutorials/react-and-spring-data-rest/

* https://docs.spring.io/spring-data/rest/docs/current/reference/html/

### How did I build the project & run?

I've used https://start.spring.io/ to download the project with some basic dependencies.

To run:

```shell
$ cd [project-name]
$ mvn clean spring-boot:run
```

It may take some time the first time.

#### Tech used:

* Maven for dependency management with spring-boot goal.

* Spring Boot, Spring Data Rest (along with HATEOAS).

* Eclipse IDE (for writing, maven run from console).

### Progress

I've managed to implement the controller in the old way, by creating a class, exception handler and a repository.

However while trying to stick to the HATEOAS filosophy that Spring docs advocates for RESTful services found some difficulties with pagination calls. That triggered the research where I found Spring Data Rest and after implementing it everything got solved.

* Added another method on repository for filter by role from the front end.
* Added Cross Origin Requests feature with open configuration so no problem arrises when running this locally. Of course this can be fine tunned to port, host, HTTP methods.
* Also added a method for populate database with data from JSON.

Initial approach I've followed in one of the guides above for using react turned out to contain too much _plumbing code_ and a lot of complexity just for taking advantage of HATEOAS.
So quited that and headed for a simple React project from the scratch to connect to the service and do the required tasks. Here I got into trouble because I did get on the first two or ten tries the updating of status (and the expected rest call).
Only yesterday I was able to advance on that.

Pending:
* Package all together in a single project (and repository) and run the front end client through maven.
* Filter by name. (although is the same approach of role).
* Improve pagination.
* Better style of the whole page template.
