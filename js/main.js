$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let username = e.target.value;

        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '0233a376abdb3d450795',
                client_secret: '3f47301904466ccba96a9abc550f99200d467429'
            }
        }).done(function(user) {
            // console.log(user)
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '0233a376abdb3d450795',
                    client_secret: '3f47301904466ccba96a9abc550f99200d467429',
                    sort: 'created: asc',
                    per_page: 5
                }   
            }).done(function (repos) {
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-12">
                                <div class="row">
                                    <div class="card">
                                        <div class="card-body" style="display:flex; justify-content: space-between;">
                                            <div class="col-lg-7">
                                                <strong>${repo.name}</strong>: ${repo.description}
                                            </div>
                                            <div class="col-lg-3">
                                                <span class="badge bg-primary">Forks: ${repo.forks_count}</span>
                                                <span class="badge bg-warning text-dark">Watchers: ${repo.watchers_count}</span>
                                                <span class="badge bg-success">Stars: ${repo.stargazers_count}</span>
                                            </div>
                                            <div class="col-lg-2">
                                                <a target="_blank class="btn btn-primary" href="${repo.html_url}"><button type="button" class="btn btn-primary btn-block my-1";>Repo Page</button></a>
                                            </div>        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                });
            })
            $('#profile').html(`
            <div class="card mb-3">
                <div class="row">
                    <div class="col-md-2 text-center">
                        <img src="${user.avatar_url}" style="width:100%"; class="img-fluid rounded thumbnail " alt="...">
                        <a target="_blank class="btn btn-primary" href="${user.html_url}"><button type="button" class="btn btn-primary btn-block my-1" style="width:100%";>View Profile</button></a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                            <span class="badge bg-warning text-dark">Public Gists: ${user.public_gists}</span>
                            <span class="badge bg-success">Followers: ${user.followers}</span>
                            <span class="badge bg-danger">Following: ${user.following}</span>
                        </div>
                        <ol class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        </ol>
                    </div>
                </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos">
            
            </div>
            `)
        })
    })
});