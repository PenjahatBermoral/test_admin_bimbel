function Home() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Example Widget */}
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <div className="icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
  
            {/* Additional Widgets can go here */}
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;
  