import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/Register";
import Branches from "../pages/admin/Branches";
import Staff from "../pages/admin/Staff";
import Services from "../pages/admin/Services";
import Calendar from "../pages/admin/Calendar";
import AdminLayout from "../layouts/AdminLayout";
import Customers from "../pages/admin/Customers";
import Billing from "../pages/admin/Billing";
import Inventory from "../pages/admin/Inventory";
import LoyaltyAdmin from "../pages/admin/Loyalty";
import Dashboard from "../pages/admin/Dashboard";
import AdminReviews from "../pages/admin/Reviews";

import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import BookAppointment from "../pages/customer/BookAppointment";
import MyBookings from "../pages/customer/MyBookings";
import LoyaltyCustomer from "../pages/customer/Loyalty";
import Profile from "../pages/customer/Profile";
import InvoiceHistory from "../pages/customer/InvoiceHistory";
import CustomerReviews from "../pages/customer/Reviews";


import ReceptionLayout from "../layouts/ReceptionLayout";
import ReceptionDashboard from "../pages/reception/Dashboard";
import NewBooking from "../pages/reception/NewBooking";
import ReceptionCalendar from "../pages/reception/Calendar";
import CheckIn from "../pages/reception/CheckIn";
import Checkout from "../pages/reception/Checkout";
import ReceptionCustomers from "../pages/reception/Customers";

// Stylist Layout
import StylistLayout from "../layouts/StylistLayout";
import StylistDashboard from "../pages/stylist/Dashboard";
import MySchedule from "../pages/stylist/MySchedule";
import CurrentService from "../pages/stylist/CurrentService";
import History from "../pages/stylist/History";


import AssistantLayout from "../layouts/AssistantLayout";
import AssistantDashboard from "../pages/assistant/Dashboard";
import Tasks from "../pages/assistant/Tasks";
import Schedule from "../pages/assistant/Schedule";

// const Dashboard = () => (
//   <div className="p-6">
//     <h1 className="text-2xl font-bold">
//       Dashboard
//     </h1>
//   </div>
// );

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/register" 
          element={<Register />} 
        />
        
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/" element={<Navigate to="/login" replace />}/>

        <Route
          path="/reception"
          element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN", "RECEPTIONIST"]}
          >
          <ReceptionLayout />
          </ProtectedRoute>
          }
          >

          <Route index element={<ReceptionDashboard />} />
          <Route path="new-booking" element={<NewBooking />} />
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<Checkout />} />
          {/* <Route path="customers" element={<ReceptionCustomers />} /> */}
          {/* <Route path="calendar" element={<ReceptionCalendar />} /> */}

          {/* //Admin path */}
          <Route path="calendar" element={<Calendar />}/>
          <Route path="customers"element={<Customers />}/>
          <Route path="billing" element={ <Billing />}/>

        </Route>

        <Route
          path="/stylist"
          element={
          <ProtectedRoute
          allowedRoles={["OWNER","ADMIN","STYLIST"]}
          >
          <StylistLayout/>
          </ProtectedRoute>
          }
          >

          <Route index element={<StylistDashboard/>}/>
          <Route path="schedule" element={<MySchedule/>}/>
          <Route path="current" element={<CurrentService/>}/>
          <Route path="history" element={<History/>}/>
        </Route>

        <Route
          path="/customer"
          element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
          <CustomerLayout />
          </ProtectedRoute>
          }
          >

          <Route index element={<Home />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="loyalty" element={<LoyaltyCustomer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="invoices" element={<InvoiceHistory />} />
          <Route path="reviews" element={<CustomerReviews />} />
        </Route>

        <Route
          path="/assistant"
          element={
          <ProtectedRoute allowedRoles={["ASSISTANT"]}>
          <AssistantLayout />
          </ProtectedRoute>
          }
          >

          <Route index element={<AssistantDashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>



        <Route
          path="/admin"
          element={
          <ProtectedRoute allowedRoles={["OWNER", "ADMIN"]}>
          <AdminLayout />
          </ProtectedRoute>
          }
          >

          <Route index element={<Dashboard />} />
          <Route path="branches" element={<Branches />} />
          <Route path="staff" element={<Staff />} />
          <Route path="services"element={<Services />} />
          <Route path="inventory" element={<Inventory/>} />
          <Route path="loyalty" element={<LoyaltyAdmin />} />
          <Route path="reviews" element={<AdminReviews/>}/>
          <Route path="calendar" element={<Calendar />}/>
          <Route path="customers"element={<Customers />}/>
          <Route path="billing" element={ <Billing />}/>
        </Route>
  
        <Route
          path="/calendar"
          element={
          <ProtectedRoute allowedRoles={["OWNER","ADMIN","RECEPTIONIST",]}>
          <Calendar />
          </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
          <ProtectedRoute allowedRoles={["OWNER", "ADMIN", "RECEPTIONIST"]}>
          <Customers />
          </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
          <ProtectedRoute allowedRoles={["OWNER","ADMIN","RECEPTIONIST",]}>
          <Billing />
          </ProtectedRoute>
          }
        />
         
        {/* <Route
          path="/admin/branches"
          element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <Branches />
          </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="/admin/staff"
          element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <Staff />
          </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="/admin/services"
          element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <Services />
          </ProtectedRoute>
          }
        /> */}

        {/* <Route 
        path="/admin/inventory" 
        element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <Inventory/>
          </ProtectedRoute>
        }
        />

        <Route 
        path="/admin/loyalty" 
        element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <LoyaltyAdmin />
          </ProtectedRoute>
        } 
        />

        <Route 
        path="/admin/reviews" 
        element={
          <ProtectedRoute
          allowedRoles={["OWNER", "ADMIN"]}
          >
          <AdminReviews/>
          </ProtectedRoute>
        }
        /> */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;