import { useCallback, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ShoppingCart, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  formatDayinString,
  formatTimeinString,
  calculateTotalAmount,
} from "../../lib/utils";

const CartMenu = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state: any) => state.cart.cart);

  const handleRemoveSession = useCallback(
    (IndexSession: number) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: IndexSession });
    },
    [sessions],
  );

  return (
    <Menu as="div" className="w-full flex  relative inline-block text-left">
      <div>
        <Menu.Button className="w-auto justify-center">
          <div className="w-auto relative mx-4">
            <ShoppingCart className="h-8 w-8 text-secondary" />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-secondary text-white flex flex-col items-center justifiy-center rounded-full text-sm">
              {sessions.length && sessions.length > 0 ? sessions.length : 0}
            </span>
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="div"
          className="absolute left-0 z-[60] mt-2 w-[320px] top-6 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-4 px-4">
            <table className="w-full flex-row justify-between">
              <thead className="text-xs">
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session: any, index: number) => {
                  return (
                    <tr key={"row_table_session" + index}>
                      <td>
                        <span className="text-xs">
                          <strong>{session.service_name}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="text-sm">
                          {formatDayinString(session.datetime) +
                            " " +
                            formatTimeinString(session.datetime)}
                        </span>
                      </td>
                      <td>
                        <span className="text-sm">
                          {"S/." + session.option.price + ".00"}
                        </span>
                      </td>
                      <td className="flex flex-col items-center justify-center">
                        <span
                          className="ml-2 w-4 hover:text-primary cursor-pointer"
                          onClick={() => handleRemoveSession(index)}
                        >
                          {<X />}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t border-slate-300">
                  <td>
                    <span className="text-sm">
                      <strong>Total</strong>
                    </span>
                  </td>
                  <td></td>
                  <td>
                    <span className="text-sm">
                      {"S/." + calculateTotalAmount(sessions) + ".00"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CartMenu;
