import { Link } from "react-router-dom";


export default function EditForm() {

    return (
        <div class="container-fluid px-4">
            <h1 class="mt-4">Chỉnh sửa nhân viên</h1>

            <div class="card mb-4">
                <div class="card-header d-flex align-items-center">
                    <svg class="svg-inline--fa fa-table me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z"></path></svg>
                    Edit new
                    <button type="button" class="btn btn-primary ms-auto">
                        <a href="/users" class="text-white text-decoration-none">
                            <svg class="svg-inline--fa fa-rotate-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"></path></svg> Back
                        </a>
                    </button>
                </div>
                <div class="card-body">
                    <form action="/users/edit/62830fd121205ead20047ef4" method="POST">
                        <div class="row mb-3">
                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="username" name="username" type="text" placeholder="Enter your username" value="demoito" />
                                    <label htmlFor="address">username</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="password" name="password" type="text" placeholder="Enter your password" value="$2a$08$vw6BhZUB4EfK28WtVcy0mOJ0dYcqPSuFC6dVakNk3OD6Oy/p.fEwy" />
                                    <label htmlFor="address">password</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <select class="form-select" name="role" value="user">
                                        <option value="admin">admin
                                        </option>
                                        <option value="user" selected="">user
                                        </option>
                                    </select>
                                    <label htmlFor="address">role</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" name="fullname" type="text" placeholder="Enter your firstname" value="hello" />
                                    <label>fullname</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" name="address" type="text" placeholder="Enter your address" value="vinh" />
                                    <label>address</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="email" name="email" type="text" placeholder="Enter your email" value="dfgdf1@gmail.com" />
                                    <label htmlFor="address">email</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="phone" name="phone" type="text" placeholder="Enter your phone" value="0968796244" />
                                    <label htmlFor="address">phone</label>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="preview mb-4">
                                    <img width="100%" height="400px" src="
                                                        
                                                            https://res.cloudinary.com/dungdv/image/upload/v1652756397/kyxlypq5eijqabbmp9rj.png
                                                        
                                                " alt="" id="img" />
                                </div>
                                <div class="input-group">
                                    <input type="file" class="form-control" id="file" aria-describedby="image_button" aria-label="Upload" />
                                    <button class="btn btn-outline-secondary" type="button" id="image_button">Upload</button>
                                    <input class="form-control d-none" id="images" name="images" type="text" value="62830fad21205ead20047eee" placeholder="Enter your phone" />
                                </div>
                            </div>

                        </div>
                        <div class="mt-4 mb-0">
                            <div class="d-grid justify-content-end">
                                <button type="submit" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}